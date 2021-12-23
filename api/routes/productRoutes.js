const express= require("express");
const router= express.Router();

router.get("/",(req,res)=> {
    res.status(200).json({
        success:true,
        message:"you have hit the correct route"
    });
})

router.post("/",(req,res)=> {
    res.status(200).json({
        success:true,
        message:"you have hit the correct route"
    });
})

router.put("/:id",(req,res)=> {
    res.status(200).json({
        success:true,
        message:`you want to edit ${req.params.id}`
    });
})

router.delete("/:id",(req,res)=> {
    res.status(200).json({
        success:true,
        message:`you want to delete ${req.params.id}`
    });
})


module.exports= router;