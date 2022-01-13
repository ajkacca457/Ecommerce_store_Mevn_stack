const asyncHandler= require("../middlewares/asyncHandler");
const ErrorClass= require("../utils/ErrorClass");
const Product= require("../models/Products");


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

    query= Product.findById(req.params.id);

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

    let query;

    query= Product.create(req.body);

    const product= await query;

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

    const product= Product.findByIdAndUpdate(req.params.id, req.body, {
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
