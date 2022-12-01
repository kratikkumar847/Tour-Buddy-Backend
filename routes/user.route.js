const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const   middleware = require("../middlewares/jwtToken");


router.get("/user/:userID" , [middleware.verifyToken] , userController.getUserByID );


module.exports = router;

