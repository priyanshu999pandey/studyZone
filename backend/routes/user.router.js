import {Router} from "express";
import { editProfile, getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.get("/getcurrentuser",isAuth,getCurrentUser);
userRouter.post("/update-profile",isAuth,upload.single("photo"),editProfile);

export default userRouter;