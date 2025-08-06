import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuthenticatedRequest extends Request{
user?:JwtPayload &{id:string,role:string;
  refreshToken?:string
}
}