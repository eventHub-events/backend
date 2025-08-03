import { ITokenService } from "../../../application/interface/user/ITokenService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserTokenPayload } from "../../interface/IUserTokenPayload";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = (process.env.JWT_EXPIRY || "1d") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export class JWTToken implements ITokenService{
   async generateToken(payload:object): Promise<string> {

       const token=  jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRY})
       
       return token
   }
   async generateRefreshToken(payload: object): Promise<string> {
       const token= jwt.sign(payload,JWT_SECRET,{expiresIn:"7d"})
       return token
   }
   async verifyToken(token:string): Promise<IUserTokenPayload> {
    try{

      return  jwt.verify(token,JWT_SECRET)as IUserTokenPayload
     
    }catch(error){
      throw new Error("Invalid or expired token")
    }


   }
   async verifyRefreshToken(token: string): Promise<IUserTokenPayload> {
       return jwt.verify(token,JWT_SECRET) as IUserTokenPayload
   }
}