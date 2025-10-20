 import express, { NextFunction, Response } from "express"
 const router= express.Router()

import { authController, authenticationMiddleWare } from "../../../di/container"
import { downloadPdfController, organizerVerificationController, usersListController } from "../../../di/admin/containersList"
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest"
import { InputDataValidator } from "../../../infrastructure/middleware/zodMiddleware/inputDataValidator"
import { categoryValidateSchema, categoryValidateUpdateSchema } from "../../../infrastructure/validation/schemas/admin/categorySchema"
import { categoryController } from "../../../di/admin/category/containersList"



 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))
 router.get("/usersList",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>usersListController.fetchUsers(req,res))
 router.post("/updateUser",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>usersListController.UpdateUser(req,res))
  router.post("/download-pdf",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>downloadPdfController.downloadPdf(req,res))

  //organizer verification  related
  router.get("/organizers/:organizerId/verification",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.fetchOrganizerVerificationDetails(req,res))
  router.get("/pending-organizers",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.fetchPendingOrganizersWithProfile(req,res))
  router.post("/organizers/:organizerId/updateDocument",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.updateOrganizerUploadDocumentStatus(req,res))
  router.patch("/organizers/:organizerId/verification-status",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.updateOverallVerificationStatus(req,res))

  // category related Routs//
  router.get("/categories", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.fetchAllCategory(req, res, next) );
  router.get("/categories/:categoryId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.fetchCategory(req, res, next));
  router.post("/categories",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare) ,InputDataValidator.validate(categoryValidateSchema), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.create(req, res, next));
  router.patch("/categories/:categoryId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), InputDataValidator.validate(categoryValidateUpdateSchema), (req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.edit(req, res, next));
  router.patch("/categories/:categoryId/soft-delete", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => categoryController.delete(req, res, next));
 

 export default router

