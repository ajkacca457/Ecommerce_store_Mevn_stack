const express= require("express");
const dotenv = require("dotenv");
const categoryRouter= require("./routes/categoryRoutes");
const logbook= require("./middlewares/logbook");
const dbConnection= require("./config/db.js");
const errorHandler=require("./middlewares/errorHandler");


dotenv.config({
    path:"./config/config.env"
});

dbConnection();

const app= express();
app.use(express.json());

app.use(logbook);

app.use("/api/v1/categories",categoryRouter);

app.use(errorHandler);

const PORT= process.env.PORT || 5000;


const server= app.listen(PORT, console.log(`server is running on port ${PORT}`));


process.on("unhandledRejection", (err,promise)=> {
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
})