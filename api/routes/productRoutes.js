const express= require("express");
const {getProducts,postProduct,singleProduct,updateProduct}= require("../controllers/productControllers");

const router= express.Router({mergeParams :true});

router.route("/").get(getProducts).post(postProduct);
router.route("/:id").get(singleProduct).put(updateProduct);



module.exports=router;
