 import express from "express"
 const router= express.Router()

import { authController } from "../../../di/container"


 router.post("/login",(req,res)=>authController.loginUser(req,res))
 router.post("/logout",(req,res)=>authController.logout(req,res))

 export default router

