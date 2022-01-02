const Product= require("../models/Products");

exports.getProducts= (req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"you found all the products successfully"
    })

}

exports.postProduct=async (req,res,next)=> {
    const product= await Product.create(req.body);

    try {
        res.status(200).json({
            success:true,
            message: "you have created a product successfully",
            product:product
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error: error
        })


    }

}

exports.singleProduct= (req,res,next)=> {
    res.status(200).json({
        success:true,
        message: "you have found a product successfully"
    })

}

exports.updateProduct= (req,res,next)=> {
    res.status(200).json({
        success:true,
        message: "you have updated the product successfully"
    })

}

exports.deleteProduct= (req,res,next)=> {
    res.status(200).json({
        success:true,
        message: "you have deleted the product successfully"
    })

}