const express =require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const dotenv = require("dotenv").config();
const app = express();

const cors = require("cors");

app.use(
    cors()
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const DB = "mongodb+srv://kratik:1234@cluster0.qqggtnr.mongodb.net/tourbuddydb?retryWrites=true&w=majority";
const DB = "mongodb://kratik:1234@ac-iiwxcnu-shard-00-00.qqggtnr.mongodb.net:27017,ac-iiwxcnu-shard-00-01.qqggtnr.mongodb.net:27017,ac-iiwxcnu-shard-00-02.qqggtnr.mongodb.net:27017/tourbuddydb?ssl=true&replicaSet=atlas-c5unyd-shard-0&authSource=admin&retryWrites=true&w=majority";
// mongoose.connect( DB, ()=>{
//     try{
//         console.log("MongoDB connected");   
//     }
//     catch(error){
//         console.log(error);
//     }
// });

mongoose.connect(DB, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');

app.use( '/api' , authRouter );
app.use( '/api' , userRouter );
app.use( '/api' , postRouter );


app.listen( process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:${ process.env.PORT }`)
})
