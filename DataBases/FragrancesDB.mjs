import {mongoose} from "mongoose"

import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    

    console.log('MongoDB Connected...'); 
  } catch (err) {
    console.error(err.message);
    process.exit(1); 
  } 
};    

export default connectDB;  
 
   