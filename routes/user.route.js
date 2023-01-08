const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const   middleware = require("../middlewares/jwtToken");




/** get user details - GET  */
router.get("/user/:userID" , [middleware.verifyToken] , userController.getUserByID );


module.exports = router;