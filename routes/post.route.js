const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const   JWTAuth = require("../middlewares/jwtToken");


/** add post - POST  */
router.post("/post/add" ,[ JWTAuth.verifyToken ], postController.createPost );

/** get all post - POST  */
router.get("/post" ,[ JWTAuth.verifyToken ], postController.getAllPost );

/** get all posts of specific user - GET  */
router.get("/post/user" ,[ JWTAuth.verifyToken ], postController.getAllPostByUserID );

/** add member in a post - PUT  */
router.put("/:id/member/add" ,[ JWTAuth.verifyToken ], postController.addMember );

/** delete a post  - DELETE  */
router.delete("/post/:id" ,[ JWTAuth.verifyToken ], postController.deletePost );


module.exports = router