exports.getProducts=(req,res,next)=> {
    res.status(200).json({
        success:true,
        message:"you have hit the correct route"
    });
};

exports.postProduct=(req,res,next)=> {
    res.status(200).json({
        success:true,
        message:"you have hit the correct route"
    });
}


exports.updateProduct=(req,res,next)=> {
    res.status(200).json({
        success:true,
        message:`you want to edit ${req.params.id}`
    });
}

exports.deleteProduct=(req,res,next)=> {
    res.status(200).json({
        success:true,
        message:`you want to delete ${req.params.id}`
    });
};