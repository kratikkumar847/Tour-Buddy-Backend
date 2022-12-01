const Post = require("../models/post.model");
const User = require("../models/user.model");
const response = require("../utils/response");

exports.createPost = async (req, res) => {

    const postData = {
        description: req.body.description,
        destination: req.body.destination,
        noOfPeople: req.body.noOfPeople,
    }


    try {
        const user = await User.findOne({
            userID: req.userID
        });

        const createdPost = await Post.create(postData);

        /**
        *  response
        */

        createdPost.creator = user.userID;
        user.postCreated.push(createdPost._id);



        const newPost = {
            postID: createdPost._id,
            creator: createdPost.creator,
            description: createdPost.description,
            destination: createdPost.destination,
            noOfPeople: createdPost.noOfPeople,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt
        }
        await user.save();
        await createdPost.save();

        res.status(201).send({
            success: true,
            status: 201,
            message: `${createdPost._id} , Added Successully !`,
            post: newPost

        });
    } catch (err) {

        console.log(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error , while Adding POST !"
        })
    }


}

/* API to fetch all the Tickets */
exports.getAllPost = async (req, res) => {
    try {


        const user = await User.findOne({
            userID: req.userID
        });

        // console.log(user);

        const post = await Post.find();

        // console.log(post);

        const postsDetails = {
            postID: post._id,
            creator: post.creator,
            description: post.description,
            destination: post.destination,
            noOfPeople: post.noOfPeople,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }

        return res.status(200).send({
            success: true,
            message: `${user.userID} , Fetched All Posts !`,
            post: response.postResponse(post)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: `Error in Fetching Posts`,
        });
    }

}

exports.getAllPostByUserID = async (req, res) => {

    try {


        const postByUser = await Post.find({
            creator : req.userID
        });

        res.status(200).send({
            success: true,
            message: "Fetched all post !",
            post: postByUser
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Internal Server Error , while Fetching Post by userID !`
        })
    }


}

exports.addMember = async ( req , res ) => {

    try{
        const user = await Post
    }
}
