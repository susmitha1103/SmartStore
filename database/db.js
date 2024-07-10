const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'SmartStore', '.env')})

const connectDB = async() =>{

  try{
    await mongoose.connect(process.env.mongoURI,{
      useNewUrlParser: true,
      useUnifiedToplogy: true
    });
    console.log("Connected to mongoDB")
  }
  catch(err){
    console.error(err.message)
    process.exit(1);
   
  }
};

module.exports = connectDB;