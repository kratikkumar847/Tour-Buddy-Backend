const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const   JWTAuth = require("../middlewares/jwtToken");


/** createTicket - POST  */
router.post("/post/add" ,[ JWTAuth.verifyToken ], postController.createPost );

/** getallpost - POST  */
router.get("/post" ,[ JWTAuth.verifyToken ], postController.getAllPost );


router.get("/post/user" ,[ JWTAuth.verifyToken ], postController.getAllPostByUserID );


module.exports = router