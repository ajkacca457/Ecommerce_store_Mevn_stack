const Product= require("../models/Products");
const ErrorClass=require("../utils/ErrorClass");

exports.getProducts=async (req,res,next)=>{
    try {
    const products= await Product.find();
    if(!products) {
      return  res.status(404).json({
            success:false,
            message:"The products you are looking for doesnt exists"
        })
    }
    res.status(200).json({
        success:true,
        products:products,
        count: products.length,
        message:"Here are your list of products"
    })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            Error: error,
            message:"Try again"
        })
    
    }

}

exports.postProduct=async (req,res,next)=> {
    try {
        const product= await Product.create(req.body);
        res.status(200).json({
            success:true,
            data:product,
            message: "you have created a product successfully",
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error: error
        })

    }

}

exports.singleProduct= async (req,res,next)=> {
    try {
        const product= await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success:false,
                message:"The product you are looking for doesnt exists"
            })  
        }

        res.status(200).json({
            success:true,
            data:product,
            message: "Product found",
        })
        
    } catch (error) {
     next(new ErrorClass(`Invalid id or product`,501));
    }

}

exports.updateProduct= async (req,res,next)=> {
    try {
        const product= await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        if(!product) {
            return  res.status(400).json({
                success:false,
                message: "Product cannot be found"
            })  
        }
        
        res.status(200).json({
            success:true,
            data:product,
            message: "you have updated the product successfully"
        })

        
    } catch (error) {
        res.status(200).json({
            success:true,
            Error:error,
            message: "Try again."
        })    
        
    }

}

exports.deleteProduct=async (req,res,next)=> {

    try {
     const product= await Product.findByIdAndDelete(req.params.id);
        if(!product) {
        return res.status(400).json({
                success:false,
                message: "not a valid product/id"
            })

        }
        res.status(200).json({
            success:true,
            data: product,
            message: "you have deleted the product successfully"
        })
        
    } catch (error) {
 
        res.status(400).json({
            success:false,
            Error:error,
            message: "Try again"
        })
        
    }

}