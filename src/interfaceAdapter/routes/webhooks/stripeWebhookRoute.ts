import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { stripeWebhookController } from "../../../di/common/commonContainers";



const router = express.Router();

// Stripe requires the raw body for signature verification


router.post("/stripe", express.raw({type: "application/json"}),(req: Request, res: Response, next: NextFunction) => stripeWebhookController.handle(req, res, next));

export default router;
