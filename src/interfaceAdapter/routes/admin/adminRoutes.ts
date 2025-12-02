 import express, { NextFunction, Request, Response } from "express"
 const router= express.Router()

import { authController, authenticationMiddleWare } from "../../../di/container"
import { downloadPdfController, organizerVerificationController, usersListController } from "../../../di/admin/containersList"
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest"
import { InputDataValidator } from "../../../infrastructure/middleware/zodMiddleware/inputDataValidator"
import { categoryValidateSchema, categoryValidateUpdateSchema } from "../../../infrastructure/validation/schemas/admin/categorySchema"
import { categoryController } from "../../../di/admin/category/containersList"
import { eventManagementQueryController, eventModerationActionsController, eventModerationController } from "../../../di/admin/event-management/containerList"
import { bookingControllerForAdmin } from "../../../di/admin/bookings/container"
import { subscriptionPlansManagementController, subscriptionPlansRetrievalController } from "../../../di/admin/subcription-plans/container"
import { adminReportController } from "../../../di/admin/report/container"
import { adminDashBoardController } from "../../../di/admin/dashboard/container"
import { bookingQuerySchema } from "../../../infrastructure/validation/schemas/organizer/bookingQuerySchema"
import { UserFilterOptionsSchema } from "../../../infrastructure/validation/schemas/admin/userFilterOptionSchema"




 router.post("/login",(req: Request, res: Response, next: NextFunction)  => authController.loginUser(req, res, next));
 router.post("/logout",(req: IAuthenticatedRequest, res: Response, next: NextFunction)=>authController.logout(req, res, next));

 // user-management//
 router.get("/usersList",InputDataValidator.validateQuery(UserFilterOptionsSchema),authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res: Response, next: NextFunction) => usersListController.fetchUsers(req, res, next));
 router.post("/updateUser",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:  IAuthenticatedRequest, res: Response, next: NextFunction) => usersListController.UpdateUser(req, res, next));

  router.post("/download-pdf",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest,res: Response, next: NextFunction)=>downloadPdfController.downloadPdf(req,res, next));

  //organizer verification  related
  router.get("/organizers/:organizerId/verification",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res:  Response, next: NextFunction)=>organizerVerificationController.fetchOrganizerVerificationDetails(req,res, next));
  router.get("/pending-organizers",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res: Response, next: NextFunction)=>organizerVerificationController.fetchPendingOrganizersWithProfile(req,res, next));
  router.post("/organizers/:organizerId/updateDocument",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res: Response, next:NextFunction)=>organizerVerificationController.updateOrganizerUploadDocumentStatus(req,res, next));
  router.patch("/organizers/:organizerId/verification-status",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res: Response, next: NextFunction)=>organizerVerificationController.updateOverallVerificationStatus(req,res, next));

  // category related Routs//
  router.get("/categories", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.fetchAllCategory(req, res, next) );
  router.get("/categories/:categoryId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.fetchCategory(req, res, next));
  router.post("/categories",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare) ,InputDataValidator.validate(categoryValidateSchema), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.create(req, res, next));
  router.patch("/categories/:categoryId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), InputDataValidator.validate(categoryValidateUpdateSchema), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.edit(req, res, next));
  router.patch("/categories/:categoryId/soft-delete", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.delete(req, res, next));
    router.get("/common/categories", (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.fetchAllCategory(req, res, next) );

  // event -management //

  router.get("/events/:eventId/event-moderation", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationController.fetchDetailsByEvent(req, res, next));
  router.post("/event-moderation",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationController.create(req, res, next));
  router.patch("/event-moderation/:eventId/update",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationController.update(req, res, next));
  router.get("/events",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventManagementQueryController.getAllEvents(req, res, next));
  // router.get("/events",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventRetrievalController.getAllEvents(req, res, next));

  // event-management-actions //
   router.patch("/events/:eventId/block", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationActionsController.block(req, res, next));
   router.patch("/events/:eventId/unBlock", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationActionsController.unBlock(req, res, next));
   router.patch("/events/:eventId/approve", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationActionsController.approve(req, res, next));
   router.patch("/events/:eventId/reject", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest , res : Response, next: NextFunction) => eventModerationActionsController.reject(req, res, next));

   // booking-management//
    router.get("/bookings",InputDataValidator.validateQuery(bookingQuerySchema),authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res : Response , next :NextFunction ) => bookingControllerForAdmin.fetchBookings(req, res, next));
    router.get("/bookings/:bookingId", (req: Request, res: Response, next: NextFunction) => bookingControllerForAdmin.fetchBookingById(req, res, next));



    // Subscription-plans//
    router.get("/plans",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => subscriptionPlansRetrievalController.fetchAll(req, res, next));
    router.post("/plans",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:Request, res: Response, next:NextFunction) => subscriptionPlansManagementController.create(req, res, next));
    router.put("/plans/:planId",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:Request, res: Response, next: NextFunction) => subscriptionPlansManagementController.update(req, res, next));
    router.patch("/plans/:planId/status",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:Request, res: Response, next: NextFunction) => subscriptionPlansManagementController.updateStatus(req, res, next));
 
   // reports //
   router.get("/reports/:targetType",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => adminReportController.fetchReports(req, res, next));
   router.put("/report/:reportId",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => adminReportController.takeAction(req, res, next));

   // dashboard //
  router.get("/dashboard", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => adminDashBoardController.getDashboard(req, res, next));

  
 export default router

