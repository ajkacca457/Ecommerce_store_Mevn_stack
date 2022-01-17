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

    sendTokenAndCookie(user,res,"user created successfully");
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

  sendTokenAndCookie(user,res,"login successful");  

})


exports.userDetail=asyncHandler(async (req,res,next)=> {
   const user= await User.findById(req.user._id);
   if(!user) {
       return next(new ErrorClass("User doesnt exists", 404));
   }

   res.status(200).json({
       success:true,
       data:user,
       message:"User detail found"
   })

})


const sendTokenAndCookie=(user,res,message)=> {
const token= user.getJsonToken();

const options= {
    expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
    httpOnly:true
}

res.status(200).cookie("token",token,options).json({
    success:true,
    token:token,
    message:message
})
}

