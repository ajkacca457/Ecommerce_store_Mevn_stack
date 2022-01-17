const ErrorClass= require("../utils/ErrorClass");
const asyncHandler= require("../middlewares/asyncHandler");
const User= require("../models/Users");



exports.registerUser= asyncHandler(async (req,res,next)=> {
    const {name,email,password,role}= req.body;
    const user= await User.create({
        name,email,password,role
    });

    if(!user) {
        return next(new ErrorClass("something went wrong in registration, 404"))
    }  

    const token= user.getJsonToken();

    console.log(token);
 
    res.status(200).json({
        success: true,
        token:token,
        message: "user created successfully"
    })

})



exports.loginUser=asyncHandler(async (req,res,next)=> {
    const {email,password}= req.body;
   
    if(!email || !password) {
        return next(new ErrorClass("Invalid credintial", 404))
    }

    const user= await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorClass("Invalid credintial",404))
    }

    //match password and check if it is valid

    const isMatch= await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorClass("Invalid password", 404))
    }

    const token= user.getJsonToken();

    res.status(200).json({
       success:true,
       token:token,
       message:"login successful"
    })
    

})