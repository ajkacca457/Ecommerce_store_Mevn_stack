const jwt= require("jsonwebtoken");
const asyncHandler= require("./asyncHandler");
const ErrorClass= require("../utils/ErrorClass");
const User= require("../models/Users");



exports.protectRoutes= asyncHandler(async (req,res,next)=> {

    // check if authorization header exists and start with beartoken
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token= req.headers.authorization.split(" ")[1];
    };

    if(!token) {
        return next(new ErrorClass("Not authorized to access the route"),401)
    }

    try {
        
      const decoded= jwt.verify(token,process.env.JWT_SECRET);  
        req.user= await User.findById(decoded.id);

    } catch (error) {
        return next(new ErrorClass("Not authorized to access the route"));
    }

    next();
})

