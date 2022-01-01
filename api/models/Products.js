const mongoose= require("mongoose");

const ProductSchema= new mongoose.Schema({

    name: {
        type:String,
        required: [true,"Product must have a name"],
        maxlength: [50, "Product name cannot be bigger than 50 charachter"]
    },
    slug: {
        type:String
    },
    description: {
        type:String,
        minlength: [50, "A product should have a small description"],
        required: [true, "Product should have a description"],
        maxlength: [1000, "Product description cannont be too big"]
    },
    price : Number,
    productimg: {
        type:String,
        default:"no-photo.jpg"
    },
    createdAt: {
        type:Date,
        default: Date.now
    }

})


module.exports=mongoose.model("Product",ProductSchema);

