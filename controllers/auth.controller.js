const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/** Registration Controller  for the User  */

exports.signup = async (req, res) => {

    const UserDetailsStoredInDB = {
        name: req.body.name,
        userID: req.body.userID,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),

    }

    /**
    * Create the New User and Added to the database
    */
    try {
        const createdUser = await User.create(UserDetailsStoredInDB);

        /**
        *  response
        */
        const ResponseOfNewUser = {
            name: createdUser.name,
            userID: createdUser.userID,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }

        return res.status(201).send({
            success: true,
            status: 201,
            message: `${createdUser.name} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error ,when Insert User !"
        })
    }

}


/**
 * signin Controller
 */
exports.signin = async (req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ userID: req.body.userID });
    } catch (err) {
        console.log(err.message);
    }

    if (user == null) {
        return res.status(400).send("User ID Doesn't Exist !")
    }

    //User is exists , check for the valid password
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send("Invalid Password")
    }

    //** Successfull login */
    //need to generate access token now
    const token = jwt.sign({ id: user.userID }, process.env.SECRET, {
        expiresIn: '2h'
    });

    //Send the response back 
    return res.status(200).send({
        success: true,
        status: 200,
        message: `${user.userID} login Successfully !`,
        user: {
            name: user.name,
            userID: user.userID,
            email: user.email,
            accessToken: token
        }
    })

};


/**
 * get user details Controller
 */

exports.getUserByID = async (req, res) => {

    try {
        const user = await User.findOne({ userID: req.params.userID })

        if (!user) {
            return res.status( 200 ).send({
                success : true,
                message : `No user Found with userID : ${ user.userID }`
            })
        }

        return res.status(200).send({
            success: true,
            message: `${user.userID} , Fetched the user !`,
            user: user
        })
    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: `Internal Server Error , while Fetching user By ID  `,

        })

    }
}