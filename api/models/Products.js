const mongoose= require("mongoose");
const { default: slugify } = require("slugify");


const ProductSchema= new mongoose.Schema({

    name : {
        type:String,
        required: [true, "product must have a name"],
        maxlength: [50, "product name cannot be too long"]
    },
    description: {
        type:String,
        required:[true,"product should have a description"]
    },
    size: {
        type:String,
        enum: ["XL","L", "M", "SM", "XSM"]
    },
    price: Number,
    slug: String,
    productImg: {
        type:String,
        default:"no-photo.jpg"
    },
    rating:{
        type:Number,
        min: [0,"The lowest possible rating"],
        max: [5, "The highest possible rating"]
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    category: {
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:true

    }

})


ProductSchema.pre("save", function(next){

    this.slug= slugify(this.name, {
        lower:true
    });

    next();

})


module.exports= mongoose.model("Product",ProductSchema);