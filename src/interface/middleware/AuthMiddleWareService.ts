import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../infrastructure/commonResponseModel/ApiResponse";
import { boolean, jwt } from "zod";
import { ITokenService } from "../../application/interface/user/ITokenService";
import { IAuthMiddleware } from "../../application/interface/user/IAuthMiddleware";
import { IAuthenticatedRequest } from "../../infrastructure/interface/IAuthenticatedRequest";
import { JwtPayload } from "jsonwebtoken";
import { IDecodedUserPayload } from "../../domain/types/IDecodedUserPayload";

export class AuthMiddlewareService implements IAuthMiddleware {
  constructor(private _tokenService: ITokenService) {}
  async authenticateUser(
    token: string
  ): Promise<IDecodedUserPayload> {
    try {
      const decoded = await this._tokenService.verifyToken(token);
      return decoded;
    } catch (err:unknown) {
  if(err instanceof Error){

    throw new Error(err.message ||"Error in decoding the token");
  }
        throw new Error("Error in decoding the token")
    }
  }

  async validateRefreshToken(
    refreshToken: string
  ): Promise<IDecodedUserPayload> {
    try {
      const decoded = await this._tokenService.verifyRefreshToken(refreshToken);
      return decoded;
    } catch (err:unknown) {
      if(err instanceof Error){
         throw new Error(err.message || "Error in  decoding the token")
      }
      throw new Error("Error in decoding the token")
   
    }
  }
}
