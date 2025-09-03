import express, { Request, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { authController, authenticationMiddleWare } from "../../../di/container";
import { documentController, organizerProfileController } from "../../../di/organizer/container";


const router= express.Router()


router.post("/forgetPassWord",(req:IAuthenticatedRequest,res)=>authController.forgetPassWord(req,res))
router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res)=>authController.verifyResetPasswordOtp(req,res))
router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>authController.changePassword(req,res))
router.post("/organizerProfile",(req:Request,res:Response)=>organizerProfileController.createProfile(req,res))
router.patch("/organizerProfile/:id",(req:Request,res:Response)=>organizerProfileController.updateOrganizerProfile(req,res))
router.get("/organizerProfile/:id",(req:Request,res:Response)=>organizerProfileController.getOrganizerProfile(req,res))

router.post("/document/presigned-url",(req:Request,res:Response)=>documentController.getPresignedUrl(req,res))


export default router