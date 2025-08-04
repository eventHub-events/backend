import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../../application/user/auth/RegisterUserUsecase";
import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { VerifyOtpUseCase } from "../../../application/user/auth/VerifyOtpUseCase";
import { IRegisterUserUseCase } from "../../../application/interface/user/IRegisterUserUseCase";
import { IVerifyOtpUseCase } from "../../../application/interface/user/IVerifyOtpUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IResendOtpUseCase } from "../../../application/interface/user/IResendOtpUseCase";
import { ILoginUserUseCase } from "../../../application/interface/user/ILoginUserUseCase";
import { IRefreshTokenUseCase } from "../../../application/interface/user/IRefreshTokenUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { User } from "../../../domain/entities/User";
import { IUserLoginResponse } from "../../../domain/types/IUserLoginResponse";

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,

    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _generateAccessTokenUseCase:IRefreshTokenUseCase
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = new UserRegisterDTO(req.body);
      const result = await this._registerUserCase.execute(dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message));
    } catch (err: unknown) {
      const message= err instanceof Error? err.message :"Something went wrong";
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
      const message= err instanceof Error? err.message :"Something went wrong";
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
        .json(ApiResponse.success("OTP verified successfully", result));
    } catch (err: unknown) {
      const message= err instanceof Error? err.message :"Something went wrong";
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(message));
    }
  }
  async loginUser(req: Request, res: Response){
    try {
      const { email, password } = req.body;
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
      const message= err instanceof Error? err.message :"Something went wrong";
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error(message));
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
      const message= err instanceof Error? err.message :"Something went wrong";
         return res.status(HttpStatusCode.UNAUTHORIZED).json(ApiResponse.error(message))

    }
  }
}
