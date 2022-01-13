const express= require("express");
const {getProducts,postProduct,singleProduct,updateProduct,deleteProduct}= require("../controllers/productControllers");

const router= express.Router({mergeParams :true});

router.route("/").get(getProducts).post(postProduct);
router.route("/:id").get(singleProduct).put(updateProduct).delete(deleteProduct);



module.exports=router;
