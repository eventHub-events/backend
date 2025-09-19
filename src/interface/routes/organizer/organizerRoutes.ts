import express, { NextFunction, Request, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { authController, authenticationMiddleWare } from "../../../di/container";
import { documentController, organizerAccountSecurityController, organizerProfileController } from "../../../di/organizer/container";
import { ZodPasswordValidator } from "../../../infrastructure/middleware/zodValidator";
import { passwordSchema } from "../../../infrastructure/validaton/schemas/changePasswordSchema";
// import { OrganizerAccountSecurityController } from "../../controllers/organizer/organizerAccoutSecurityController";


const router= express.Router()


router.post("/forgetPassWord",(req:IAuthenticatedRequest,res)=>authController.forgetPassWord(req,res))
router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res)=>authController.verifyResetPasswordOtp(req,res))
router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res)=>authController.changePassword(req,res))
router.post("/organizerProfile",(req:Request,res:Response)=>organizerProfileController.createProfile(req,res))
router.patch("/organizerProfile/:id",(req:Request,res:Response,next:NextFunction)=>organizerProfileController.updateOrganizerProfile(req,res,next))
router.get("/organizerProfile/:id",(req:Request,res:Response)=>organizerProfileController.fetchOrganizerProfile(req,res))
router.patch("/updatePassword/:organizerId",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),ZodPasswordValidator.validate(passwordSchema),(req:IAuthenticatedRequest,res:Response,next:NextFunction)=> organizerAccountSecurityController.updatePassword(req,res,next) )


router.post("/upload-document", (req, res) => documentController.saveDocument(req, res));
router.get("/uploaded-documents/:organizerId", (req, res) => documentController.getDocuments(req, res));
router.delete("/uploaded-document/:documentId/deletion",(req:Request,res:Response)=>documentController.deleteDocument(req,res))




export default router
