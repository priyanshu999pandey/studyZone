 import express from "express"
 import dotenv from "dotenv"
 import dbConnect from "./config/dbConnect.js"

 dotenv.config()
 const app = express()
 
 const port =process.env.PORT

 app.get("/",(req,res)=>{
    res.send("Hello from Server")
 })

 app.listen(port,()=>{
    console.log("server started");
    dbConnect()
 })