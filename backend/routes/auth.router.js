import { Router } from "express"
import { login, signUp , logout} from "../controllers/auth.controller.js";

const authRouter = Router();

 authRouter.post("/signup",signUp)
 authRouter.post("/login",login)
 authRouter.get("/logout",logout)

 export default authRouter