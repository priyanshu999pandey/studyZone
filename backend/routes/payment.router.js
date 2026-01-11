import {Router} from "express";
import isAuth from "../middlewares/isAuth.js"
import { checkOutController } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session",isAuth,checkOutController);

export default paymentRouter;