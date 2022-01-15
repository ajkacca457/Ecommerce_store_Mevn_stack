const Category= require("../models/Categories");
const ErrorClass=require("../utils/ErrorClass");
const asyncHandler= require("../middlewares/asyncHandler");

exports.getCategories=asyncHandler(async (req,res,next)=>{
    //copy the queryString
     let reqQuery= {...req.query};
     console.log(reqQuery);
    let query;
    query= Category.find().populate({
        path:"products",
        select:"name description price"
    });

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

    const page= parseInt(req.query.page,10)||1;
    const limit= parseInt(req.query.limit,10)||25;
    const startIndex= (page-1)*limit;
    const endIndex= page*limit;
    const total= await Category.countDocuments();

    query= query.skip(startIndex).limit(limit);

    let pagination= {};

    if(endIndex<total) {
        pagination.next= {
            page:page+1,
            limit
        }
    };

    if(startIndex>0) {
        pagination.prev= {
            page:page-1,
            limit
        }
    };

    const categories= await query;   

    if(!categories) {
      return  next(new ErrorClass("Categories doesnt exists.",404));
    }
    res.status(200).json({
        success:true,
        pagination:pagination,
        data:categories,
        count: categories.length,
        message:"Here are your list of categories"
    })
})

exports.postCategory=asyncHandler(async (req,res,next)=> {
        const category= await Category.create(req.body);
        if(!category) {
            return next(new ErrorClass("Give required info to create category", 404));

        }

        res.status(200).json({
            success:true,
            data:category,
            message: "you have created a category successfully",
        })})

exports.singleCategory= asyncHandler(async (req,res,next)=> {
        const category= await Category.findById(req.params.id).populate({
            path:"products",
            select:"name price"
        });
        if(!category) {
            return next(new ErrorClass("category not found", 404));
        }

        res.status(200).json({
            success:true,
            data:category,
            message: "category found",
        })})

exports.updateCategory= asyncHandler(async (req,res,next)=> {
        const category= await Category.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        if(!category) {
            return next(new ErrorClass("category not found to update",404)); 
        }
        
        res.status(200).json({
            success:true,
            data:category,
            message: "you have updated the category successfully"
        })})

exports.deleteCategory= asyncHandler(async (req,res,next)=> {
     const category= await Category.findByIdAndDelete(req.params.id);
        if(!category) {
        return next(new ErrorClass("category not found to delete", 404));
        }
        category.remove();
        res.status(200).json({
            success:true,
            data: category,
            message: "you have deleted the category successfully"
        })})