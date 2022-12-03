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
            creator: req.userID
        });

         return res.status(200).send({
            success: true,
            message: "Fetched all post !",
            TotalPost: postByUser.length,
            post: postByUser
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Internal Server Error , while Fetching Post by userID !`
        })
    }


}

exports.addMember = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (!post.member.includes(req.body.userID)) {
            await post.updateOne({ $push: { member: req.body.userID } }).exec();

            await post.save();
           console.log( "len : ", post.member.length );
           
         if(post.member.length < post.noOfPeople){
           return res.status(200).json({
                success: true,
                message: "Member Added !",
                post: response.postResponseByID( post )
                })
            }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Number of people are full",
                    post: response.postResponseByID( post )
                    })
            }
        }
        else {
            console.log( "len : ", post.member.length );
            return res.status(500).json({
                success: true,
                message: "Member is already present !"
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/* Delete a post */
exports.deletePost = async (req ,res) =>{
   
    try{
       
       const post = await Post.findById(req.params.id);
       console.log("post : ", post);
       if(!post) {
            return  res.status(403).json({
                success : true,
                message : "Post does not found !"
             })
       }
       if(post.creator === req.userID){
          console.log("POST.UserID :", post.creator);
          // console.log("req.body.userID :", req.body.userID);
          await post.deleteOne();
          res.status(200).json({
             success : true,
             message : "The user has been Deleted, Successfully !"
          })
       }else{
        console.log("POST.UserID :","error");
          res.send(403).json({
             sucess : false,
             message : "You can Delete only your post !"
          })
       }
       
    }
    catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};
