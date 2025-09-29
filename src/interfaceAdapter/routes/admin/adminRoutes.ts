 import express from "express"
 const router= express.Router()

import { authController, authenticationMiddleWare } from "../../../di/container"
import { downloadPdfController, organizerVerificationController, usersListController } from "../../../di/admin/containersList"
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest"



 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))
 router.get("/usersList",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>usersListController.fetchUsers(req,res))
 router.post("/updateUser",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>usersListController.UpdateUser(req,res))
  router.get("/download-pdf",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>downloadPdfController.downloadPdf(req,res))

  //organizer verification  related
  router.get("/organizers/:organizerId/verification",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.fetchOrganizerVerificationDetails(req,res))
  router.get("/pending-organizers",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.fetchPendingOrganizersWithProfile(req,res))
  router.post("/organizers/:organizerId/updateDocument",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.updateOrganizerUploadDocumentStatus(req,res))
  router.patch("/organizers/:organizerId/verification-status",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>organizerVerificationController.updateOverallVerificationStatus(req,res))
 

 export default router

