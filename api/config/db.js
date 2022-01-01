const mongoose= require("mongoose");


const dbConnection= async ()=> {
    const connection= await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB is connected to:${connection.connection.host}`);
}


module.exports=dbConnection;