const express= require("express");
const { registerUser}= require("../controllers/authController");


const router= express.Router();



router.route("/register").put(registerUser);



module.exports= router;