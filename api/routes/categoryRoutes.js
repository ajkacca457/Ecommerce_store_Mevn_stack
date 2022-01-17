const express= require("express");
const router= express.Router();
const {getCategories, postCategory,singleCategory,updateCategory,deleteCategory} = require("../controllers/categoryControllers");
const productRouter= require("../routes/productRoutes");
const {protectRoutes,authorize}= require("../middlewares/auth");


router.use("/:categoryId/products", productRouter);


router.route("/").get(getCategories).post(protectRoutes,authorize("admin"),postCategory);

router.route("/:id").get(singleCategory).put(protectRoutes,authorize("admin"),updateCategory).delete(protectRoutes,authorize("admin"),deleteCategory);


module.exports= router;