const express= require("express");
const {getProducts,postProduct}= require("../controllers/productControllers");

const router= express.Router({mergeParams :true});

router.route("/").get(getProducts).post(postProduct);



module.exports=router;
