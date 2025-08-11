 import express from "express"
 const router= express.Router()

import { authController } from "../../../di/container"
import { usersListController } from "../../../di/admin/containersList"


 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))
 router.get("/usersList",(req,res)=>usersListController.fetchUsers(req,res))

 export default router

