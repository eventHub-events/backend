import { ITokenService } from "../../../application/interface/useCases/user/ITokenService";
import { IUserTokenPayload } from "../../interface/IUserTokenPayload";

export class TokenService{
  constructor(private _tokenService :ITokenService){}
  async generateToken(payload:IUserTokenPayload|{email:string}):Promise<string>{
    const token= await this._tokenService.generateToken(payload)
    return token
  }
    async generateResetToken(payload:IUserTokenPayload|{email:string}):Promise<string>{
    const token= await this._tokenService.generateToken(payload)
    return token
  }
  async generateRefreshToken(payload:IUserTokenPayload):Promise<string>{
     const token =await this._tokenService.generateRefreshToken(payload)
     return token
  }
  async verifyToken(token:string):Promise<IUserTokenPayload>{
    const verificationResult= await this._tokenService.verifyToken(token)
    return verificationResult
  }
  async verifyRefreshToken(token:string):Promise<IUserTokenPayload>{
    return await this._tokenService.verifyRefreshToken(token)
  }
}