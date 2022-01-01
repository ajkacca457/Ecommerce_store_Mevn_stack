const express= require("express");
const dotenv = require("dotenv");
const productRouter= require("./routes/productRoutes");
const logbook= require("./middlewares/logbook");
const dbConnection= require("./config/db.js");


dotenv.config({
    path:"./config/config.env"
});

dbConnection();

const app= express();

app.use(logbook);

app.use("/api/v1/products",productRouter);

const PORT= process.env.PORT || 5000;


const server= app.listen(PORT, console.log(`server is running on port ${PORT}`));


process.on("unhandledRejection", (err,promise)=> {
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
})