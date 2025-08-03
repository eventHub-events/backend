import { NextFunction, Request, Response } from "express";
import { IAuthMiddleware } from "../../application/interface/user/IAuthMiddleware";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../infrastructure/commonResponseModel/ApiResponse";
import { IAuthenticatedRequest } from "../../infrastructure/interface/IAuthenticatedRequest";

export class AuthenticationMiddleWare {
  constructor(private _authMiddlewareService: IAuthMiddleware) {}

  async authenticateUser(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies?.authToken;
      if (!accessToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(ApiResponse.error("Unauthorized", HttpStatusCode.UNAUTHORIZED));
      }
      const decoded= await this._authMiddlewareService.authenticateUser(accessToken)
      req.user=decoded
      next()
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error("Invalid or expired token"));
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
