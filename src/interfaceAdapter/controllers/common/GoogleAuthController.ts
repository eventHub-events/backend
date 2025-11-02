import { NextFunction, Request, Response } from "express";
import { IGoogleAuthUseCase } from "../../../application/interface/common/useCase/IGoogleAuthUseCase";
import { GoogleAuthService } from "../../../infrastructure/services/googleAuthService/Auth";

export class GoogleAuthController {
     constructor(
         private _googleAuthService : GoogleAuthService,
         private _authUseCase :  IGoogleAuthUseCase
     ){}
  
    async googleLogin( req: Request, res: Response, next: NextFunction) :Promise<void> {
       try{
           const {token}  = req.body ;
           const googleUser = await this._googleAuthService.verifyGoogleToken(token);
        const result =await this._authUseCase.execute(googleUser)

       }catch(err){
          next(err)
       }
    }
} 