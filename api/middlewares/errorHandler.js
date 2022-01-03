const errorHandler=(error,req,res,next)=> {

     res.status(error.statusCode || 404).json({
         success:false,
         error:error.message
     })

}




module.exports=errorHandler;