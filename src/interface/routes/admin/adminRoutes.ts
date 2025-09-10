 import express from "express"
 const router= express.Router()

import { authController, authenticationMiddleWare } from "../../../di/container"
import { downloadPdfController, usersListController } from "../../../di/admin/containersList"
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest"



 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))
 router.get("/usersList",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>usersListController.fetchUsers(req,res))
 router.post("/updateUser",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>usersListController.UpdateUser(req,res))
//  router.get("/download-pdf",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>downloadPdfController.downloadPdf(req,res))
 router.get("/download-pdf",(req,res)=>downloadPdfController.downloadPdf(req,res))
 

 export default router

