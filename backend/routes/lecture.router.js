import {Router} from "express";
import isAuth from "../middlewares/isAuth.js"
import { createLecture, editLecture, getLecture, removeLecture } from "../controllers/lecture.controller.js";
import upload from "../middlewares/multer.js";

const lectureRouter = Router();

lectureRouter.post("/create-lecture/:courseId",isAuth,createLecture);
lectureRouter.put("/edit-lecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture);
lectureRouter.get("/get-lecture/:courseId",isAuth,getLecture);
lectureRouter.get("/remove-lecture/:lectureId",isAuth,removeLecture);

export default lectureRouter