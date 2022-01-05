const ErrorClass= require("../utils/ErrorClass");


const errorHandler=(error,req,res,next)=> {
    let customError= {...error};
    customError.message=error.message;

    if(error.name=== "CastError") {
        const message= `Product is not found in store with ID: ${error.value}`;
        customError= new ErrorClass(message,404);
    }
    if(error.name=== "ValidationError") {
        const message= Object.values(error.errors).map(val=> val.message);
        customError= new ErrorClass(message,404);
        
    }

    //will recieve the error in as it is the next middleware
     res.status(customError.statusCode || 404).json({
         success:false,
         error:customError.message
     })

}

module.exports=errorHandler;