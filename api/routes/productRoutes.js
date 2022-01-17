const express= require("express");
const {getProducts,postProduct,singleProduct,updateProduct,deleteProduct, uploadProductPhoto}= require("../controllers/productControllers");
const {protectRoutes}= require("../middlewares/auth");

const router= express.Router({mergeParams :true});

router.route("/").get(getProducts).post(protectRoutes,postProduct);
router.route("/:id/photo").put(protectRoutes,uploadProductPhoto);
router.route("/:id").get(singleProduct).put(protectRoutes,updateProduct).delete(protectRoutes,deleteProduct);



module.exports=router;
