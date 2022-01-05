const Product= require("../models/Products");
const ErrorClass=require("../utils/ErrorClass");
const asyncHandler= require("../middlewares/asyncHandler");

exports.getProducts=asyncHandler(async (req,res,next)=>{
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
})

exports.postProduct=asyncHandler(async (req,res,next)=> {
        const product= await Product.create(req.body);
        if(!product) {
            return new ErrorClass("Give required info to create product", 404);

        }

        res.status(200).json({
            success:true,
            data:product,
            message: "you have created a product successfully",
        })})

exports.singleProduct= asyncHandler(async (req,res,next)=> {
        const product= await Product.findById(req.params.id);
        if(!product) {
            return new ErrorClass("Product not found", 404);
        }

        res.status(200).json({
            success:true,
            data:product,
            message: "Product found",
        })})

exports.updateProduct= asyncHandler(async (req,res,next)=> {
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
        })})

exports.deleteProduct= asyncHandler(async (req,res,next)=> {
     const product= await Product.findByIdAndDelete(req.params.id);
        if(!product) {
        return new ErrorClass("product not found to delete", 404);
        }
        res.status(200).json({
            success:true,
            data: product,
            message: "you have deleted the product successfully"
        })})