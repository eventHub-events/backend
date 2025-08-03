import { ITokenService } from "../../../application/interface/user/ITokenService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserTokenPayload } from "../../interface/IUserTokenPayload";
import { unknown } from "zod";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = (process.env.JWT_EXPIRY || "1d") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export class JWTToken implements ITokenService{
   async generateToken(payload:object): Promise<string> {
    try{
      const token=  jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRY})
      return token

    }catch(err:unknown){
        if(err instanceof Error){
          throw new Error(err.message||"Error in generating access token")
        }
        throw new Error("Error in  generating access token")
    }

       
   }
   async generateRefreshToken(payload: object): Promise<string> {
    try{
      
       const token= jwt.sign(payload,JWT_SECRET,{expiresIn:"7d"})
       return token
    }catch (err:unknown){
      if(err instanceof Error){
          throw new Error(err.message||"Error in generating refresh token")
        }
        throw new Error("Error in  generating refresh token")
    }
   }
   async verifyToken(token:string): Promise<IUserTokenPayload> {
    try{

      return  jwt.verify(token,JWT_SECRET)as IUserTokenPayload
     
    }catch(error:unknown){

       if(error  instanceof Error){
          throw new Error(error.message||"Invalid or expired token")
        }
        
        throw new Error("Invalid or expired token")
    }
      

    }

    async verifyRefreshToken(token: string): Promise<IUserTokenPayload> {
        return jwt.verify(token,JWT_SECRET) as IUserTokenPayload
    }

   }
