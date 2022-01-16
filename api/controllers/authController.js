const ErrorClass= require("../utils/ErrorClass");
const asyncHandler= require("../middlewares/asyncHandler");
const User= require("../models/Users");



exports.registerUser= asyncHandler(async (req,res,next)=> {

    res.status(200).json({
        success: true,
        message: "user will be created successfully"
    })

})
