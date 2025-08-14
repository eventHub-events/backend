
import { IRefreshTokenUseCase } from "../../interface/user/IRefreshTokenUseCase";
import { ITokenService } from "../../interface/user/ITokenService";

export class RefreshTokenUseCase implements IRefreshTokenUseCase{
  constructor(private _tokenService:ITokenService){}
  async  generateAccessToken(token: string): Promise<string> {
      const result= await this._tokenService.verifyRefreshToken(token)
      const AccessToken=await this._tokenService.generateToken(result)
      return AccessToken

  }
}