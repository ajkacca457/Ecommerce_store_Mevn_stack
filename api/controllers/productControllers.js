const Product= require("../models/Products");
const ErrorClass=require("../utils/ErrorClass");
const asyncHandler= require("../middlewares/asyncHandler");

exports.getProducts=asyncHandler(async (req,res,next)=>{
    //copy the queryString

    let reqQuery= {...req.query};

    let queryString= JSON.stringify(reqQuery);
    queryString=queryString.replace(/\b(gt|lt|gte|lte|in)\b/g, item=> `$${item}`);
    
    let query= Product.find(JSON.parse(queryString));

    if(reqQuery.select) {
        const selectString= reqQuery.select.split(",").join(" ");
        query= query.select(selectString);
    }

    if(reqQuery.sort) {
        const sortString=reqQuery.sort.split(",").join(" ");
        query=query.sort(sortString);
    }else {
        query=query.sort("createdAt");
    }

    const products= await query;    

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