
/**
* Schema for the POST Model will be provided Here
*/
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name : {
        type: String, 
        required : true 
    },

    userID: {
        type: String,
        unique : true,
        required: true
    },

    email : {
        type : String, 
        unique : true,
        required : true
    },

    password :{
        type:String,
        required:true
    },

    member : {
        type : Array,
        default :[]
    },

    postCreated :{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Post" /* Collection Name */
    }

});

/* These will automatically generates the created and updated fields */
userSchema.set('timestamps' , true);



module.exports = mongoose.model("User", userSchema);


