const express= require("express");
const router= express.Router();
const {getCategories, postCategory,singleCategory,updateCategory,deleteCategory} = require("../controllers/categoryControllers");
const productRouter= require("../routes/productRoutes");
const {protectRoutes}= require("../middlewares/auth");


router.use("/:categoryId/products", productRouter);


router.route("/").get(protectRoutes,getCategories).post(protectRoutes,postCategory);

router.route("/:id").get(singleCategory).put(protectRoutes,updateCategory).delete(protectRoutes,deleteCategory);


module.exports= router;