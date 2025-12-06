 import express, { NextFunction, Response } from "express"
import { authenticationMiddleWare } from "../../../di/container";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { reviewController } from "../../../di/common/review/container";
import { checkBlockedMiddleware } from "../../../di/common/commonContainers";

 const router = express.Router();
  
  router.post("/event/:eventId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.addEventReview(req, res, next));
  router.post("/organizer/:organizerId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.addOrganizerReview(req, res, next));
  router.put("/:reviewId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.updateReview(req, res, next));
  router.delete("/:reviewId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.deleteReview(req, res, next));
  router.get("/organizer/:targetType/:targetId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.fetchReviewsForOrganizerEvents(req, res, next));
  router.get("/:targetType/:targetId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.fetchReviews(req, res, next));
  router.get("/summary/:targetType/:targetId/", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reviewController.getSummary(req, res, next))



 export default router