import {Router} from "express";
import isAuth from "../middlewares/isAuth.js"
import { checkOutController, stripeWebhook } from "../controllers/payment.controller.js";
import bodyParser from "body-parser";

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session",isAuth,checkOutController);
paymentRouter.post("/webhook",bodyParser.raw({type: "application/json"}),stripeWebhook)

export default paymentRouter;