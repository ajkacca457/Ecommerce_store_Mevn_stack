exports.logbook=(req,res,next)=> {
    req.message= {
        title: "hello",
        description :"this is pretty cool"
    }
    console.log(req.url+" "+req.protocol+" "+req.method);
    next();
    }