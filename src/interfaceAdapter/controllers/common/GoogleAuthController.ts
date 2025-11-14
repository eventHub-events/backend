import { NextFunction, Request, Response } from "express";
import { IGoogleAuthUseCase } from "../../../application/interface/common/useCase/IGoogleAuthUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IGoogleAuthService } from "../../../application/service/common/IGoogleAuthService";

export class GoogleAuthController {
     constructor(
         private _googleAuthService : IGoogleAuthService,
         private _authUseCase :  IGoogleAuthUseCase
     ){}
  
    async googleLogin( req: Request, res: Response, next: NextFunction) :Promise<void> {
       try{
           const {token, role}  = req.body ;
           const googleUser = await this._googleAuthService.verifyGoogleToken(token, role);

           
        const {token:jwtToken, refreshToken, userData} = await this._authUseCase.execute(googleUser);

       res.cookie("authToken", jwtToken, {
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
          .json(ApiResponse.success(ResponseMessages.AUTHENTICATION.LOGIN.SUCCESS,HttpStatusCode.OK,userData));
       }catch(err){
          next(err)
       }
    }
} 