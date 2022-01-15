const asyncHandler= require("../middlewares/asyncHandler");
const ErrorClass= require("../utils/ErrorClass");
const Product= require("../models/Products");
const Category= require("../models/Categories");


exports.getProducts= asyncHandler(async (req,res,next)=> {

    let query;

    if (req.params.categoryId) {
        query= Product.find({category:req.params.categoryId});
    } else {
        query= Product.find().populate({
            path:"category",
            select:"name description"
        });
    }

const products= await query;

if(!products){
    return new ErrorClass("products are not found", 404);
}

res.status(200).json({
    success:true,
    count:products.length,
    data:products,
    message: "All the products are listed"
})

})



exports.singleProduct=asyncHandler(async (req,res,next)=> {

    let query;

    query= Product.findById(req.params.id).populate({
        path:"category",
        select: "name description"
    });

    const product= await query;

    if(!product) {
        return new ErrorClass("Product cant be found",404)
    }

    res.status(200).json({
        success:true,
        data:product,
        message:"product found"
    })

});



exports.postProduct= asyncHandler(async (req,res,next)=> {

   req.body.category= req.params.categoryId;

   const category= await Category.findById(req.params.categoryId);

   if(!category) {
    return new ErrorClass("not a valid category",404);
   }

    const product= await Product.create(req.body);

    if(!product) {
        return new ErrorClass("product cant be created",404);
    }

    res.status(200).json({
        success:true,
        data:product,
        message:"product is created"
    })

})


exports.updateProduct=asyncHandler(async (req,res,next)=> {

    const product=await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

    if(!product) {
        return new ErrorClass("product cant be updated", 404);
    }

    res.status(200).json({
        success:true,
        data: product,
        message: "Product is updated"
    })

})


exports.deleteProduct=asyncHandler(async (req,res,next)=> {

    const product= await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        return new ErrorClass("Product not found", 404);
    }

    res.status(200).json({
        success:true,
        data:product,
        message:"Product is removed"
    })

})