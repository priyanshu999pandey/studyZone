 import express from "express"
 import dotenv from "dotenv"
 import dbConnect from "./config/dbConnect.js"
 import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import cors from "cors"
import userRouter from "./routes/user.router.js";
import courseRouter from "./routes/course.router.js";
import lectureRouter from "./routes/lecture.router.js";
import paymentRouter from "./routes/payment.router.js";

 dotenv.config()

 const app = express()
  // app.use("/api/payment",paymentRouter)
  
 app.use(cookieParser()); 
 app.use(express.json());
 app.use(cors({
   origin:process.env.CLIENT_URL,
   credentials:true
 }))
 app.use("/api/auth",authRouter)
 app.use("/api/user",userRouter)
 app.use("/api/course",courseRouter)
 app.use("/api/lecture",lectureRouter)
 app.use("/api/payment",paymentRouter)
 
 const port =process.env.PORT

 app.get("/",(req,res)=>{
    res.send("Hello from Server")
 })

 app.listen(port,()=>{
  console.log(`server is running at port no ${port}`)
  dbConnect();
 })


export default app;