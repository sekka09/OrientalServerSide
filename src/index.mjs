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
                origin: ['https://www.orientalparfum.shop','http://localhost:3000','https://www.orientalparfum.shop/U2FsdGVkX18gWp8/iSKiyhKPB5FWr0dLigHLVCCzwow='],// Replace with your frontend's domain
                 methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true, // Allow cookies
              }));
            app.use(usersrouter)
            


        })




 
