import {Router} from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = Router();

userRouter.get("/getcurrentuser",isAuth,getCurrentUser);

export default userRouter;