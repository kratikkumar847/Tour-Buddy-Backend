const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const   JWTAuth = require("../middlewares/jwtToken");


/** addpost - POST  */
router.post("/post/add" ,[ JWTAuth.verifyToken ], postController.createPost );

/** getallpost - POST  */
router.get("/post" ,[ JWTAuth.verifyToken ], postController.getAllPost );


router.get("/post/user" ,[ JWTAuth.verifyToken ], postController.getAllPostByUserID );


router.put("/:id/member/add" ,[ JWTAuth.verifyToken ], postController.addMember );


router.delete("/post/:id" ,[ JWTAuth.verifyToken ], postController.deletePost );


module.exports = router