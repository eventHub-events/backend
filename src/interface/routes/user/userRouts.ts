import { authController, passwordController } from '../../../di/container';
import express, { NextFunction, Response } from 'express';
import { authenticationMiddleWare } from '../../../di/container';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
const router = express.Router();

router.post('/register', (req, res) => authController.registerUser(req, res));
router.post('/verify-otp', (req, res) => authController.verifyOtp(req, res));
router.post('/resend-otp', (req, res) => authController.resendOtp(req, res));
router.post("/login",(req,res)=>authController.loginUser(req,res))
router.post ("/logout",(req,res)=>authController.logout(req,res))
router.post("/refreshToken",(req:IAuthenticatedRequest,res)=>authController.refreshAccessToken(req,res))

router.post("/forgetPassword" ,(req:IAuthenticatedRequest,res:Response,next:NextFunction)=>passwordController.requestForgetPassword(req,res,next))


router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res,next:NextFunction)=>passwordController.verifyResetPasswordOtp(req,res,next))

router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare),(req:IAuthenticatedRequest,res: Response,next:NextFunction)=>passwordController.changePassword(req,res,next))


export default router;
