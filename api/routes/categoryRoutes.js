const express= require("express");
const router= express.Router();
const {getCategories, postCategory,singleCategory,updateCategory,deleteCategory} = require("../controllers/categoryControllers");


router.route("/").get(getCategories).post(postCategory);

router.route("/:id").get(singleCategory).put(updateCategory).delete(deleteCategory);


module.exports= router;