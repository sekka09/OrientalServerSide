import express from 'express';
import cookieParser from 'cookie-parser';
import usersrouter from '../Routes/users.mjs';
import cors from 'cors';
import connectDB from "../DataBases/FragrancesDB.mjs";
import dotenv from "dotenv";
dotenv.config(); 
const app = express();
        
        
        const PORT = process.env.PORT || 8080;
        app.listen(PORT , ()=>{
            console.log(`connected at localhost:${PORT}`)
            connectDB()
            app.use(express.json())
            app.use(cookieParser()) 
            app.use(cors({
                origin: 'https://orientalserverside.onrender.com', // Replace with your frontend's domain
                credentials: true, // Allow cookies
              }));
            app.use(usersrouter)
            


        })




 
