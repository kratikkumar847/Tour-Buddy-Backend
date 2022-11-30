const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/** Registration Controller  for the User  */

exports.signup = async ( req, res ) => {

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

        res.status(201).send({
            status : 201,
            message: `${createdUser.name} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.log( err.message);
        res.status(500).send({
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
    //I need to generate access token now
    const token = jwt.sign({ id: user.userID }, process.env.SECRET, {
        expiresIn: '2h'
    });

    //Send the response back 
    res.status(200).send({
        status : 200,
        message: `${user.userID} login Successfully !`,
        user: {
            name: user.name,
            userID: user.userID,
            email: user.email,
            accessToken: token
        }
    })

};



// export.userDetails = async (req,res) =>{

// }