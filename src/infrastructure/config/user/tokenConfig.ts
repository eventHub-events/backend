import { ITokenConfig } from "../../../application/interface/user/ITokenConfig";
import { CustomError } from "../../errors/errorClass";
import { HttpStatusCode } from "../../interface/enums/HttpStatusCode";
import dotenv from "dotenv";
import jwt  from"jsonwebtoken"
dotenv.config();

export class TokenConfig implements ITokenConfig {
  public readonly jwtSecret: string;
  public readonly accessTokenExpiry: jwt.SignOptions["expiresIn"]
  public readonly refreshTokenExpiry: jwt.SignOptions["expiresIn"]
  public readonly resetTokenExpiry: jwt.SignOptions["expiresIn"];
  constructor(){
     this.jwtSecret = this.getSecretValue("JWT_SECRET");
     this.accessTokenExpiry =  (process.env.JWT_EXPIRY || "1d") as jwt.SignOptions["expiresIn"];
     this.refreshTokenExpiry = (process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d")as jwt.SignOptions["expiresIn"];
     this.resetTokenExpiry = (process.env.JWT_RESET_EXPIRY || "5m")as jwt.SignOptions["expiresIn"];


  }

  private getSecretValue(key: string):string {
    const value = process.env[key];
    if(!value){
       throw new CustomError(`${key} environment variable is required`,HttpStatusCode.FORBIDDEN);
    }
    return value
  }
  


}