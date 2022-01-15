const asyncHandler= require("../middlewares/asyncHandler");
const ErrorClass= require("../utils/ErrorClass");
const Product= require("../models/Products");
const Category= require("../models/Categories");
const path= require("path");


exports.getProducts= asyncHandler(async (req,res,next)=> {

    const reqQuery= {...req.query};
    let queryString= JSON.stringify(reqQuery);
    queryString=queryString.replace(/\b(gt|gte|lt|lte|in)\b/, (match)=> {
        return `$${match}`
    });

    console.log(queryString);

    let query;

    if (req.params.categoryId) {
        query= Product.find({...JSON.parse(queryString),category:req.params.categoryId});
    } else {
        query= Product.find(JSON.parse(queryString)).populate({
            path:"category",
            select:"name description"
        });
    }

if(req.query.select) {
    let selectString= req.query.select.split(",").join(" ");
    query.select(selectString);
}

if(req.query.sort) {
    let sortString= req.query.sort.split(",").join(" ");
    query.sort(sortString);
}

const page= parseInt(req.query.page,10)||1;
const limit= parseInt(req.query.limit,10)||10;
const startIndex=(page-1)*limit;
const endIndex= page*limit;
const total= await Product.countDocuments();

let pagination= {};

if(endIndex<total) {
    pagination.next= {
        page: page+1,
        limit
    }
}

if(startIndex>0) {
    pagination.prev= {
        page: page-1,
        limit
    }
}


const products= await query.skip(startIndex).limit(limit);

if(!products){
    return next(new ErrorClass("products are not found", 404));
}

res.status(200).json({
    success:true,
    pagination:pagination,
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
        return next(new ErrorClass("Product cant be found",404));
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
    return next(new ErrorClass("not a valid category",404));
   }

    const product= await Product.create(req.body);

    if(!product) {
        return next(new ErrorClass("product cant be created",404));
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
        return next(new ErrorClass("product cant be updated", 404));
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
        return next(new ErrorClass("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        data:product,
        message:"Product is removed"
    })

})


exports.uploadProductPhoto=asyncHandler(async (req,res,next)=> {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorClass("product is not found", 404))
    }

    if(!req.files) {
        return next(new ErrorClass("please upload an image", 404));
    }

    let file= req.files.file;

    if(!file.mimetype.startsWith("image")){
        return next(new ErrorClass("please add a valid image"),400)
    }

    if(file.size>process.env.MAX_FILE_SIZE) {
        return next(new ErrorClass("Image cant be more that 1MB"),400)
    }

    file.name=`photo_${product.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async(err)=> {
        if(err) {
            return next(new ErrorClass("Something went wrong.Try again later"),500)
        }

        await Product.findByIdAndUpdate(req.params.id, {
            productImg:file.name
        });
        
        res.status(200).json({
            success: true,
            data: file.name
        })

    })

})