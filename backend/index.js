 import express from "express"
 import dotenv from "dotenv"
 import dbConnect from "./config/dbConnect.js"
 import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";

 dotenv.config()
 const app = express()
 app.use(cookieParser()); 
 app.use(express.json());

 app.use("/api/auth",authRouter)
 
 const port =process.env.PORT

 app.get("/",(req,res)=>{
    res.send("Hello from Server")
 })

 app.listen(port,()=>{
    console.log("server started");
    dbConnect()
 })