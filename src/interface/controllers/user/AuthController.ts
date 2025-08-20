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
import { IVerifyResetPasswordOtpUseCase } from "../../../application/interface/user/IResetPasswordOTPUseCase";
import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO";
import { ResetPasswordOtpDTO } from "../../../domain/dtos/user/ResetPasswordDTO";
import { IChangePasswordUseCase } from "../../../application/interface/user/IChangePasswordUsecase";
import { ChangePasswordDTO } from "../../../domain/dtos/user/ChangePasswordDTO";

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,

    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _generateAccessTokenUseCase:IRefreshTokenUseCase,
    private _logoutUserUseCase:ILogoutUseCase,
    private  _forgetPasswordUseCase:IForgetPasswordUseCase,
    private  _VerifyResetPasswordUseCase:IVerifyResetPasswordOtpUseCase,
    private  _changePasswordUseCase:IChangePasswordUseCase
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

           const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"  as const,
    };
          res.clearCookie("authToken",cookieOptions)
          res.clearCookie("refreshToken",cookieOptions)
          return res.status(HttpStatusCode.OK).json(ApiResponse.success(result,HttpStatusCode.OK))

        }catch(err:unknown){
              const errorMessage= HandleErrorUtility.handleError(err,"Logout failed")
              return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(errorMessage,HttpStatusCode.INTERNAL_SERVER_ERROR))
        }

    }


  async refreshAccessToken(req:IAuthenticatedRequest,res:Response){
    try{
      console.log("hello from  refreshToken")
      const {refreshToken}= req.cookies

      const accessToken= await this._generateAccessTokenUseCase.generateAccessToken(refreshToken)
      console.log("access token is as ",accessToken)
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
  async verifyResetPasswordOtp(req:IAuthenticatedRequest,res:Response){
    try{
        console.log("hiiiiii")
        console.log("rew",req.body.otp)
        const dto= new ResetPasswordOtpDTO(req.body)
        console.log("dto in verify reset",dto)
            const {user,token}= await this._VerifyResetPasswordUseCase.resetPassword(dto)
            console.log

        
        if(user){
            res.cookie("resetToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 60 * 1000,
      });

          return res.status(HttpStatusCode.OK).json(ApiResponse.success("Otp verification  successful",HttpStatusCode.OK,user))
        }
      
    }catch(error){
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(HandleErrorUtility.handleError(error),HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
  }
  async changePassword(req:IAuthenticatedRequest,res:Response){
    try{
      const token= req.resetToken
      if (!token) {
  return res
    .status(HttpStatusCode.UNAUTHORIZED)
    .json(ApiResponse.error("Reset token missing or expired", HttpStatusCode.UNAUTHORIZED));
}
      const passwordUpdateDTO= new ChangePasswordDTO(req.body)
      const input={
        data:passwordUpdateDTO,
        token
      }
      const result= await this._changePasswordUseCase.changePassword(input)
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("Password changed successfully",HttpStatusCode.OK,result))

    }catch(err){
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error(HandleErrorUtility.handleError(err),HttpStatusCode.INTERNAL_SERVER_ERROR))
    }

  }

}
