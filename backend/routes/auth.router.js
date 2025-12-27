import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import { login, signUp , logout, verifyOTP, sendOTP, resetPassword, googleAuth, selectRole} from "../controllers/auth.controller.js";

const authRouter = Router();

 authRouter.post("/signup",signUp)
 authRouter.post("/login",login)
 authRouter.get("/logout",logout)
 authRouter.post("/send-otp",sendOTP);
 authRouter.post("/verify-otp",verifyOTP);
 authRouter.post("/reset-password",resetPassword);
 authRouter.post("/google-auth",googleAuth);
 authRouter.post("/select-role",isAuth,selectRole);



 export default authRouter