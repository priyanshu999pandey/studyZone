import { Router } from "express"
import { login, signUp , logout, verifyOTP, sendOTP, resetPassword} from "../controllers/auth.controller.js";

const authRouter = Router();

 authRouter.post("/signup",signUp)
 authRouter.post("/login",login)
 authRouter.get("/logout",logout)
 authRouter.post("/send-otp",sendOTP);
 authRouter.post("/verify-otp",verifyOTP);
 authRouter.post("/reset-password",resetPassword);


 export default authRouter