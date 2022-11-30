
/**
* Schema for the POST Model will be provided Here
*/
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({

    creator : {
        type: String,  
    },

    description: {
        type: String,
        required: true
    },

    destination : {
        type : String, 
        required : true
    },

    noOfPeople:{
        type:Number,
        required:true
    },

    member : {
        type : Array,
        default :[]
    }

});

/* These will automatically generates the created and updated fields */
postSchema.set('timestamps' , true);



module.exports = mongoose.model("Post", postSchema);


