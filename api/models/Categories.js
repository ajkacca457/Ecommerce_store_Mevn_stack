const mongoose= require("mongoose");

const CategorySchema= new mongoose.Schema({

    name: {
        type:String,
        unique:true,
        required: [true,"Category must have a name"],
        maxlength: [50, "Category name cannot be bigger than 50 charachter"]
    },
    slug: {
        type:String
    },
    description: {
        type:String,
        minlength: [50, "A category should have a small description"],
        required: [true, "Catgory should have a description"],
        maxlength: [1000, "Product description cannont be too big"]
    },
    createdAt: {
        type:Date,
        default: Date.now
    }

})


module.exports=mongoose.model("Category",CategorySchema);

