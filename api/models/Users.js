const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");
const jwt= require("jsonwebtoken");


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

UserSchema.pre("save", async function(next) {
    const salt= await bcryptjs.genSalt(10);
    this.password= await bcryptjs.hash(this.password,salt);
    next();
});

UserSchema.methods.getJsonToken= function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};


module.exports= mongoose.model("User",UserSchema);


