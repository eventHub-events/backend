import { Request, Response } from "express";
import { UserRegisterDTO } from "../../../domain/DTOs/user/RegisterUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";

import { IRegisterUserUseCase } from "../../../application/interface/useCases/user/IRegisterUserUsecase";
import { IVerifyOtpUseCase } from "../../../application/interface/useCases/user/IVerifyOtpUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IResendOtpUseCase } from "../../../application/interface/useCases/user/IResendOtpUseCase";
import { ILoginUserUseCase } from "../../../application/interface/useCases/user/ILoginUserUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { ILogoutUseCase } from "../../../application/interface/useCases/user/ILogoutUseCase";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";


export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,

    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _logoutUserUseCase:ILogoutUseCase,
   
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

     

      return res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success("login  successful",HttpStatusCode.OK,user));
    } catch (err:unknown) {
  
       console.log("err",err)
      const message=err instanceof Error? HandleErrorUtility.handleError(err):"something went wrong"
      

      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error(message));
    }
  }

      async  logout(req:IAuthenticatedRequest,res:Response){

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

}
