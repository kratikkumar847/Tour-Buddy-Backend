const Post = require("../models/post.model");
const User = require("../models/user.model");
const response = require("../utils/response");


/**
 * get user details Controller
 */

exports.getUserByID = async (req, res) => {

    try {
        const user = await User.findOne({ userID: req.params.userID })

        if (!user) {
            return res.status(200).send({
                success: true,
                message: `No user Found with userID : ${user.userID}`
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

