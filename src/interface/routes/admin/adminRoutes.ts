 import express from "express"
 const router= express.Router()

import { authController, authenticationMiddleWare } from "../../../di/container"
import { usersListController } from "../../../di/admin/containersList"
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest"
import { AuthController } from "../../controllers/user/AuthController"


 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))
 router.get("/usersList",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>usersListController.fetchUsers(req,res))
 router.post("/updateUser",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req,res)=>usersListController.UpdateUser(req,res))

 export default router

