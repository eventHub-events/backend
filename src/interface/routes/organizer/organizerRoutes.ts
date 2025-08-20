import express from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { authController, authenticationMiddleWare } from "../../../di/container";

const router= express.Router()


router.post("/forgetPassWord",(req:IAuthenticatedRequest,res)=>authController.forgetPassWord(req,res))
router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res)=>authController.verifyResetPasswordOtp(req,res))
router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>authController.changePassword(req,res))


export default router