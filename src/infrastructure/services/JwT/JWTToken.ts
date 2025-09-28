import { ITokenService } from "../../../application/interface/user/ITokenService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserTokenPayload } from "../../interface/IUserTokenPayload";
import { CustomError } from "../../errors/errorClass";
import { HttpStatusCode } from "../../interface/enums/HttpStatusCode";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = (process.env.JWT_EXPIRY || "1d") as jwt.SignOptions["expiresIn"];
const JWT_RESET_EXPIRY =(process.env.JWT_RESET_EXPIRY || "5m") as jwt.SignOptions["expiresIn"];
const JWT_REFRESH_TOKEN_EXPIRY  =(process.env.JWT_REFRESH_TOKEN_EXPIRY  || "7d") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new CustomError("JWT_SECRET is not defined in environment variables", HttpStatusCode.BAD_REQUEST);
}

export class JWTToken implements ITokenService{
   async generateToken( payload: object ): Promise< string > {

    try{
      const token = jwt.sign( payload, JWT_SECRET, {expiresIn:JWT_EXPIRY} )
      
     
      return token

    } catch(err: unknown ){
      
        if(err instanceof Error){
          throw new CustomError(err.message||"Error in generating access token",HttpStatusCode.INTERNAL_SERVER_ERROR)
        }
        throw new CustomError("Error in  generating access token",HttpStatusCode.INTERNAL_SERVER_ERROR)
    }

       
   }

    async generateResetToken( payload:object ): Promise< string > {

    try{
      const token=  jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_RESET_EXPIRY});
      return token

    }catch(err:unknown){

         if(err instanceof Error){
          throw new CustomError(err.message||"Error in generating  reset token",HttpStatusCode.INTERNAL_SERVER_ERROR)
        }
        throw new CustomError("Error in  generating reset token",HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
  }
   
   async generateRefreshToken( payload: object ): Promise< string > {

    try{

       const token= jwt.sign( payload, JWT_SECRET, { expiresIn:JWT_REFRESH_TOKEN_EXPIRY });
       return token;

    }catch (err:unknown){

      if(err instanceof Error){
          throw new CustomError(err.message || "Error in generating refresh token", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        throw new CustomError( "Error in  generating refresh token" ,HttpStatusCode.INTERNAL_SERVER_ERROR );
    }
   }
   async verifyToken( token:string ): Promise< IUserTokenPayload > {
    try{

      return  jwt.verify(token,JWT_SECRET)as IUserTokenPayload;
     
    }catch(error:unknown){

       if(error  instanceof Error){
          throw new CustomError(error.message||"Invalid or expired token", HttpStatusCode.UNAUTHORIZED)
        }
        
        throw new CustomError( "Invalid or expired token" ,HttpStatusCode.UNAUTHORIZED);
    }
      

    }

    async verifyRefreshToken( token: string ): Promise< IUserTokenPayload > {

    try{

      return  jwt.verify( token, JWT_SECRET ) as IUserTokenPayload;
     
    }catch(error:unknown){

        if(error  instanceof Error){
          throw new CustomError(error.message||"Invalid or expired token", HttpStatusCode.UNAUTHORIZED)
        }
        
        throw new CustomError( "Invalid or expired token" ,HttpStatusCode.UNAUTHORIZED);
    }
    }

   }
