import { NextFunction, Request, Response } from "express";
import { UserRegisterDTO } from "../../../application/DTOs/user/RegisterUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IRegisterUserUseCase } from "../../../application/interface/useCases/user/IRegisterUserUsecase";
import { IVerifyOtpUseCase } from "../../../application/interface/useCases/user/IVerifyOtpUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IResendOtpUseCase } from "../../../application/interface/useCases/user/IResendOtpUseCase";
import { ILoginUserUseCase } from "../../../application/interface/useCases/user/ILoginUserUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { ILogoutUseCase } from "../../../application/interface/useCases/user/ILogoutUseCase";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";


export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,
    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _logoutUserUseCase:ILogoutUseCase,
   
  ) {}

 async registerUser( req: Request, res: Response, next: NextFunction): Promise<void> {
   try{
         const dto: UserRegisterDTO = req.body;
         const result = await this._registerUserCase.execute(dto);

      res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message,HttpStatusCode.OK, result));
   }catch(err){
      next(err)
   }
 }

  async resendOtp(req: Request, res: Response,next :NextFunction):Promise<void> {
    try {
      
         const { email } = req.body;
          console.log("email in resent otp", email);
          const result = await this._resendOtpUseCase.execute(email);

     res.status(HttpStatusCode.OK).json(ApiResponse.success(result,HttpStatusCode.OK,result));

    } catch (err) {
       next(err)
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) : Promise<void>{
    try {
      const { email, otp } = req.body;

      const result = await this._verifyOtpUseCase.execute(email, otp);
      console.log("result after verification", result);
     
       res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success(ResponseMessages.AUTHENTICATION.OTP.OTP_VERIFICATION_SUCCESS, HttpStatusCode.OK,result));
    } catch (err) {
     
        next(err)
    }
  }
  async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
    
       
      if (!email || !password) {
         res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(ApiResponse.error("Email and password are required"));
      }

      console.log("user is login ",email,password)
      const { token, refreshToken,user } = await this._loginUserUseCase.loginUser(
        email,
        password
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

     

       res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success(ResponseMessages.AUTHENTICATION.LOGIN.SUCCESS,HttpStatusCode.OK,user));
    } catch (err) {
         next(err)
      }
  }

      async  logout(req:IAuthenticatedRequest,res:Response, next: NextFunction): Promise<void> {

        try{
          const result=await this._logoutUserUseCase.execute()

           const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                     sameSite: "strict"  as const,
                   };

          res.clearCookie("authToken",cookieOptions)
          res.clearCookie("refreshToken",cookieOptions)
   res.status(HttpStatusCode.OK).json(ApiResponse.success(result,HttpStatusCode.OK))

        }catch(err){
           next(err)
        }

    }

}
