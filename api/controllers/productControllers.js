exports.getProducts= (req,res)=>{
    res.status(200).json({
        success:true,
        message:"you found all the products successfully"
    })

}

exports.postProduct= (req,res)=> {
    res.status(200).json({
        success:true,
        message: "you have created a product successfully"
    })

}

exports.singleProduct= (req,res)=> {
    res.status(200).json({
        success:true,
        message: "you have found a product successfully"
    })

}

exports.updateProduct= (req,res)=> {
    res.status(200).json({
        success:true,
        message: "you have updated the product successfully"
    })

}

exports.deleteProduct= (req,res)=> {
    res.status(200).json({
        success:true,
        message: "you have deleted the product successfully"
    })

}