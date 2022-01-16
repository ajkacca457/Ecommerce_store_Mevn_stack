const mongoose= require("mongoose");


const UserSchema= new mongoose.Schema({

    name: {
        type:String,
        required: [true, "Name of the user is required"]
    },
    email: {
        type:String,
        match:[ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "A valid email is required"],
        required: [true, "an email address is required"],
        unique: true
    },

    password: {
        type:String,
        required:[true, "a password needs to be provided"],
        minlength: 6,
        select:false,
    },

    role: {
        type:String,
        enum: ["user","admin"],
        default:"user"

    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default:Date.now
    }

})


module.exports= mongoose.model("User",UserSchema);


