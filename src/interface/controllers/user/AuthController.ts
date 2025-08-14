import { Request, Response } from "express";
import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";

import { IRegisterUserUseCase } from "../../../application/interface/user/IRegisterUserUsecase";
import { IVerifyOtpUseCase } from "../../../application/interface/user/IVerifyOtpUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IResendOtpUseCase } from "../../../application/interface/user/IResendOtpUseCase";
import { ILoginUserUseCase } from "../../../application/interface/user/ILoginUserUseCase";
import { IRefreshTokenUseCase } from "../../../application/interface/user/IRefreshTokenUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { ILogoutUseCase } from "../../../application/interface/user/ILogoutUseCase";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { IForgetPasswordUseCase } from "../../../application/interface/user/IForgetPasswordUsecase";
import { IResetPasswordUseCase } from "../../../application/interface/user/IResetPasswordUseCase";
import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO";

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,

    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _generateAccessTokenUseCase:IRefreshTokenUseCase,
    private _logoutUserUseCase:ILogoutUseCase,
    private  _forgetPasswordUseCase:IForgetPasswordUseCase,
    private  _resetPasswordUseCase:IResetPasswordUseCase
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = new UserRegisterDTO(req.body);
      const result = await this._registerUserCase.execute(dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message));
    } catch (err: unknown) {
      const message= HandleErrorUtility.handleError(err)
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(message));
    }
  }

  async resendOtp(req: Request, res: Response) {
    try {
      console.log("resend otp working");
      const { email } = req.body;
      console.log("email in resent otp", email);
      const result = await this._resendOtpUseCase.execute(email);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result));
    } catch (err: unknown) {
      const message= HandleErrorUtility.handleError(err,"Something went wrong")
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(message));
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const result = await this._verifyOtpUseCase.execute(email, otp);
      console.log("result after verification", result);
      return res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success("OTP verified successfully", HttpStatusCode.OK,result));
    } catch (err: unknown) {
     
      const message= HandleErrorUtility.handleError(err,"something went wrong")
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(message));
    }
  }
  async loginUser(req: Request, res: Response){
    try {
      const { email, password } = req.body;
      console.log("admin email and password",email,password)
       console.log("hello  from  login")
      if (!email || !password) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(ApiResponse.error("Email and password are required"));
      }

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

      return res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success("login  successful",HttpStatusCode.OK,user));
    } catch (err:unknown) {
     
      const message= HandleErrorUtility.handleError(err,"Something went wrong")

      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error(message));
    }
  }

      async  logout(req:Request,res:Response){

        try{
          const result=await this._logoutUserUseCase.execute()
          res.clearCookie("authToken",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
              sameSite: "strict",

          })
          res.clearCookie("refreshToken",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
          })
          return res.status(HttpStatusCode.OK).json(ApiResponse.success(result,HttpStatusCode.OK,result))

        }catch(err:unknown){
              const errorMessage= HandleErrorUtility.handleError(err,"Logout failed")
              return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(errorMessage,HttpStatusCode.INTERNAL_SERVER_ERROR))
        }

    }


  async refreshAccessToken(req:IAuthenticatedRequest,res:Response){
    try{
      
      const accessToken= await this._generateAccessTokenUseCase.generateAccessToken(req.refreshToken!)
      res.cookie("authToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return res.status(HttpStatusCode.OK).json(ApiResponse.success("Access token creation successful"))


    }catch(err:unknown){
      
      
      const message= HandleErrorUtility.handleError(err,"Something went wrong")

         return res.status(HttpStatusCode.UNAUTHORIZED).json(ApiResponse.error(message))

    }
  }
  async forgetPassWord(req:IAuthenticatedRequest,res:Response){
    try{

      
      const forgetPasswordDTO= new ForgetPasswordDTO(req.body)
      const result= await this._forgetPasswordUseCase.forgetPassword(forgetPasswordDTO)
       if(result) res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message,HttpStatusCode.OK))
    }catch(err){
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(HandleErrorUtility.handleError(err),HttpStatusCode.INTERNAL_SERVER_ERROR))
    }

  }
  async resetPassword(req:IAuthenticatedRequest,res:Response){
    try{
        const{id,password}=req.body
            const updatedUser= await this._resetPasswordUseCase.resetPassword(id,password)
        
        if(updatedUser)return res.status(HttpStatusCode.OK).json(ApiResponse.success("password reset successful",HttpStatusCode.OK,updatedUser))
      
    }catch(error){
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(HandleErrorUtility.handleError(error),HttpStatusCode.OK))
    }
  }
}
