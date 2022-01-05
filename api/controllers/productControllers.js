const Product= require("../models/Products");
const ErrorClass=require("../utils/ErrorClass");

exports.getProducts=async (req,res,next)=>{
    try {
    const products= await Product.find();
    if(!products) {
      return  new ErrorClass("Products doesnt exists.",404);
    }
    res.status(200).json({
        success:true,
        products:products,
        count: products.length,
        message:"Here are your list of products"
    })
        
    } catch (error) {
        next(error);
    }

}

exports.postProduct=async (req,res,next)=> {
    try {
        const product= await Product.create(req.body);
        if(!product) {
            return new ErrorClass("Give required info to create product", 404);

        }

        res.status(200).json({
            success:true,
            data:product,
            message: "you have created a product successfully",
        })
        
    } catch (error) {
        next(error);

    }

}

exports.singleProduct= async (req,res,next)=> {
    try {
        const product= await Product.findById(req.params.id);
        if(!product) {
            return new ErrorClass("Product not found", 404);
        }

        res.status(200).json({
            success:true,
            data:product,
            message: "Product found",
        })
        
    } catch (error) {
     next(error);
    }

}

exports.updateProduct= async (req,res,next)=> {
    try {
        const product= await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        if(!product) {
            return new ErrorClass("product not found to update",404); 
        }
        
        res.status(200).json({
            success:true,
            data:product,
            message: "you have updated the product successfully"
        })

        
    } catch (error) {
        next(error);
        
    }

}

exports.deleteProduct=async (req,res,next)=> {

    try {
     const product= await Product.findByIdAndDelete(req.params.id);
        if(!product) {
        return new ErrorClass("product not found to delete", 404);
        }
        res.status(200).json({
            success:true,
            data: product,
            message: "you have deleted the product successfully"
        })
        
    } catch (error) {
        next(error);
        
    }

}