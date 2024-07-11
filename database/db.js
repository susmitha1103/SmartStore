const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '..', '.env')})

const connectDB = async() =>{
  console.log(process.env.MONGO_URI);

  try{
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to mongoDB")
  }
  catch(err){
    console.error("MongoDB connection error",err.message)
    process.exit(1);
   
  }
};

module.exports = connectDB;