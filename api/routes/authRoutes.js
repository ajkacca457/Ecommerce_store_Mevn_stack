const express= require("express");
const { registerUser,loginUser,userDetail}= require("../controllers/authController");
const {protectRoutes}= require("../middlewares/auth");

const router= express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/userDetail").get(protectRoutes,userDetail);


module.exports= router;