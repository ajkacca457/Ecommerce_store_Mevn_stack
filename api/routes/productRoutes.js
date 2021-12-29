const express= require("express");
const router= express.Router();
const {getProducts, postProduct,singleProduct,updateProduct,deleteProduct} = require("../controllers/productControllers");


router.route("/").get(getProducts).post(postProduct);

router.route("/:id").get(singleProduct).put(updateProduct).delete(deleteProduct);


module.exports= router;