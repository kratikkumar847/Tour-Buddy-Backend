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
 
mongoose.connect(process.env.DB, {
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
const homeRouter = require('./routes/home.route');

app.use( '/api' , authRouter );
app.use( '/api' , userRouter );
app.use( '/api' , postRouter );
app.use(  homeRouter );


app.listen( process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:${ process.env.PORT }`)
})
