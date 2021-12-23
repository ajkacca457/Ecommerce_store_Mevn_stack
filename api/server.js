const express= require("express");
const dotenv= require("dotenv");

dotenv.config({ path : "./config/config.env"});

const productRoutes= require("./routes/productRoutes");
const {logbook}= require("./middlewares/logbook");

const app= express();

app.use(logbook);

app.use("/api/v1/products", productRoutes);


const PORT= process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`));
