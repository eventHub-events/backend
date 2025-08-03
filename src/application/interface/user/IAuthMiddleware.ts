import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { IDecodedUserPayload } from "../../../domain/types/IDecodedUserPayload";

export interface IAuthMiddleware{
    authenticateUser(token:string):Promise<IDecodedUserPayload>
    validateRefreshToken(refreshToken:string):Promise<IDecodedUserPayload>
}