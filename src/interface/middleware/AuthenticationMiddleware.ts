import { NextFunction, Response } from "express";
import { IAuthMiddleware } from "../../application/interface/user/IAuthMiddleware";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../infrastructure/commonResponseModel/ApiResponse";
import { IAuthenticatedRequest } from "../../infrastructure/interface/IAuthenticatedRequest";

export class AuthenticationMiddleWare {
  constructor(private _authMiddlewareService: IAuthMiddleware) {}

  async authenticateUser(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies?.authToken;
      console.log("access token",accessToken)
      const  resetToken=req.cookies?.resetToken??null
      console.log("reset token",resetToken)
      if (!accessToken) {
        console.log("no  access token")
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(ApiResponse.error("Unauthorized", HttpStatusCode.UNAUTHORIZED));
      }
      
      const decoded= await this._authMiddlewareService.authenticateUser(accessToken)
      req.user=decoded
      req.resetToken=resetToken
      next()
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error("Invalid or expired token",HttpStatusCode.UNAUTHORIZED));
    }
  }
  async authenticateChangePassword(req:IAuthenticatedRequest,res:Response,next:NextFunction){
    try{
       const  resetToken=req.cookies?.resetToken??null
        if (!resetToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(ApiResponse.error("Unauthorized to reset password", HttpStatusCode.UNAUTHORIZED));
      }
      const decoded= await this._authMiddlewareService.authenticateUser(resetToken)
      req.user=decoded
      req.resetToken=resetToken
      next()

    }
    catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error("Invalid or expired token",HttpStatusCode.UNAUTHORIZED));
    }
  }

  async validateRefreshToken(req: IAuthenticatedRequest, res: Response, next: NextFunction){
    try{
      const  refreshToken= req.cookies?.refreshToken
        if(!refreshToken){
           return   res.status(HttpStatusCode.UNAUTHORIZED).json(ApiResponse.error("refreshToken missing",HttpStatusCode.UNAUTHORIZED))
  }
             const  decoded= await this._authMiddlewareService.validateRefreshToken(refreshToken)
  req.refreshToken=refreshToken;
             req.user= decoded;
             next()

    }catch (err){
       return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error("Invalid or expired refresh token",HttpStatusCode.UNAUTHORIZED));
    }
        
}

}
