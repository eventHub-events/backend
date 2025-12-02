import { NextFunction, Request, Response } from "express";
import { IGoogleAuthUseCase } from "../../../application/interface/common/useCase/IGoogleAuthUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IGoogleAuthService } from "../../../application/service/common/IGoogleAuthService";
import { CookieOptionsUtility } from "../../../utils/CookieOptions.utility";

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


         const authCookieOptions = CookieOptionsUtility.create(15 * 60 * 1000);
              res.cookie("authToken", jwtToken, authCookieOptions);
        
              const refreshCookieOption = CookieOptionsUtility.create(7 * 24 * 60 * 60 * 1000);
               res.cookie("refreshToken", refreshToken,refreshCookieOption);

  res
          .status(HttpStatusCode.OK)
          .json(ApiResponse.success(ResponseMessages.AUTHENTICATION.LOGIN.SUCCESS,HttpStatusCode.OK,userData));
       }catch(err){
          next(err)
       }
    }
} 