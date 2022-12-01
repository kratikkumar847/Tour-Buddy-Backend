const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const   middleware = require("../middlewares/signupMiddleware");

// "userID" : "jatin12",
// "password" : "jatin"



/** signup - POST  */
router.post("/auth/signup" ,[ middleware.signupMiddleware ], authController.signup );

/** signin - POST  */
router.post("/auth/signin" , authController.signin );




module.exports = router