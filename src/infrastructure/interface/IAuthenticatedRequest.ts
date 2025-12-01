import { Request } from "express";

export  interface   IAuthenticatedRequest extends Request {
  user?: { id: string; role: string };
  refreshToken?:string;
  resetToken?:string;
   

}