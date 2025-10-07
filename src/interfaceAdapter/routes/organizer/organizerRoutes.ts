import express, { NextFunction, Request, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { authenticationMiddleWare } from "../../../di/container";
import { documentController, documentVerificationRequestController, organizerAccountSecurityController, organizerProfileController } from "../../../di/organizer/container";
import { ZodPasswordValidator } from "../../../infrastructure/middleware/zodValidator";
import { passwordSchema } from "../../../infrastructure/validaton/schemas/changePasswordSchema";
import { passwordController } from "../../../di/common/commonContainers";
// import { OrganizerAccountSecurityController } from "../../controllers/organizer/organizerAccoutSecurityController";


const router= express.Router()


 router.post("/forgetPassword",(req:IAuthenticatedRequest,res: Response, next: NextFunction) => passwordController.requestForgetPassword( req, res, next));
 
 router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res: Response, next: NextFunction) => passwordController.verifyResetPasswordOtp (req, res, next))
 router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare),( req: IAuthenticatedRequest, res: Response, next: NextFunction) =>passwordController.changePassword ( req, res, next));

router.patch("/organizerProfile/:id",(req:Request,res:Response,next:NextFunction)=>organizerProfileController.updateOrganizerProfile(req,res,next))
router.get("/organizerProfile/:id",(req:Request,res:Response,next :NextFunction)=>organizerProfileController.fetchOrganizerProfile(req,res,next))
router.patch("/updatePassword/:organizerId",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),ZodPasswordValidator.validate(passwordSchema),(req: IAuthenticatedRequest,res: Response, next: NextFunction)=> organizerAccountSecurityController.updatePassword(req,res,next));


router.post("/upload-document", (req:Request, res:Response, next: NextFunction) => documentController.saveDocument(req, res, next));
router.get("/uploaded-documents/:organizerId",(req: Request, res: Response, next: NextFunction) => documentController.getDocuments(req, res,next));
router.delete("/uploaded-document/:documentId/deletion",(req: Request, res: Response, next:NextFunction) => documentController.deleteDocument(req,res,next));
router.patch("/uploaded-documents/:documentId",(req: Request, res: Response, next: NextFunction) => documentController.updateDocument( req, res, next) )

router.patch("/:organizerId/verification-request",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction ) =>  documentVerificationRequestController.completeVerificationRequest(req, res, next))





export default router
