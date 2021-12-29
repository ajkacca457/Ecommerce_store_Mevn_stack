const express= require("express");
const dotenv = require("dotenv");

const productRouter= require("./routes/productRoutes");
const logbook= require("./middlewares/logbook");

dotenv.config({
    path:"./config/config.env"
});


const app= express();

app.use(logbook);

app.use("/api/v1/products",productRouter);

const PORT= process.env.PORT || 5000;


app.listen(PORT, console.log(`server is running on port ${PORT}`));