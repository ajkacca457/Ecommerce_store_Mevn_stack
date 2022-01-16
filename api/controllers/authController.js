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

    res.status(200).json({
        success: true,
        data: {
            id:user._id,
            name: user.name,
            email:user.email,
        },
        message: "user will be created successfully"
    })

})
