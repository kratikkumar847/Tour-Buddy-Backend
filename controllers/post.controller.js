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

        const newPost = {
            postID: createdPost._id,
            creator: createdPost.creator,
            description: createdPost.description,
            destination: createdPost.destination,
            noOfPeople: createdPost.noOfPeople,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt
        }

        await createdPost.save();

        res.status(201).send({
            status: 201,
            message: `${createdPost._id} , Added Successully !`,
            post: newPost

        });
    } catch (err) {

        console.log(err);
        res.status(500).send({
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


        const post = await Post.find();

        console.log(post);

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
            message: `${user.userID} , Fetched All Posts !`,
            post: response.postResponse(post)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: `Error in Fetching Posts`,
        });
    }

}
