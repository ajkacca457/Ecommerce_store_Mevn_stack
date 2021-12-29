const logbook= (req,res,next)=> {
    req.mymsg="it is coming from middleware";
    console.log(`${req.url}, ${req.method}`);
    next();
}



module.exports=logbook;