import {Router} from "express"
import isAuth from "../middlewares/isAuth.js";
import { createCourse, editCourse, getCourseById, getCreatorCourse, getPublishedCourses, removeCourse } from "../controllers/course.controller.js";
import upload from "../middlewares/multer.js";

const courseRouter = Router();


courseRouter.post("/createCourse",isAuth,createCourse);
courseRouter.get("/getPublishedCourse",getPublishedCourses);
courseRouter.get("/getCreatorCourse",isAuth,getCreatorCourse);
courseRouter.post("/editCourse/:courseId",isAuth, upload.single("thumbnail"), editCourse);
courseRouter.get("/getCourse/:courseId",isAuth,getCourseById);
courseRouter.get("/removeCourse/:courseId",isAuth,removeCourse);


export default courseRouter


