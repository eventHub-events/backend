import { NextFunction, Response } from "express";
import { IRefreshTokenUseCase } from "../../../application/interface/useCases/user/IRefreshTokenUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";


export class TokenController {
  constructor(
   
    private _generateAccessTokenUseCase: IRefreshTokenUseCase,
    
  ){} 

  async refreshAccessToken(req:IAuthenticatedRequest,res:Response, next: NextFunction){
      try{
       console.log("get into this route")
        const {refreshToken}= req.cookies;             
  
        const accessToken =  await this._generateAccessTokenUseCase.generateAccessToken(refreshToken)
        
        res.cookie("authToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
  
        return res.status(HttpStatusCode.OK).json(ApiResponse.success("Access token creation successful"))
  
  
      }catch(err){
        next(err)

      }
    }
   
}