import { IUserTokenPayload } from "../../../infrastructure/interface/IUserTokenPayload"

export interface ITokenService{
  
  generateToken(payload:IUserTokenPayload |{email:string}):Promise<string>
  generateResetToken(payload:IUserTokenPayload |{email:string}):Promise<string>
  generateRefreshToken(payload:IUserTokenPayload):Promise<string>
  verifyToken(token:string):Promise<IUserTokenPayload>
  verifyRefreshToken(token:string):Promise<IUserTokenPayload>
}