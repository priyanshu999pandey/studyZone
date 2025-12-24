 import express from "express"
 import dotenv from "dotenv"
 import dbConnect from "./config/dbConnect.js"
 import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import cors from "cors"
import userRouter from "./routes/user.router.js";

 dotenv.config()
 const app = express()
 app.use(cookieParser()); 
 app.use(express.json());
 app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
 }))
 app.use("/api/auth",authRouter)
 app.use("/api/user",userRouter)
 
 const port =process.env.PORT

 app.get("/",(req,res)=>{
    res.send("Hello from Server")
 })

 app.listen(port,()=>{
    console.log("server started");
    dbConnect()
 })