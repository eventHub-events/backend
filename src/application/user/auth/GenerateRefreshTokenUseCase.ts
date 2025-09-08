
  import { IUserTokenPayload } from "../../../infrastructure/interface/IUserTokenPayload";
import { IRefreshTokenUseCase } from "../../interface/user/IRefreshTokenUseCase";
  import { ITokenService } from "../../interface/user/ITokenService";

  export class RefreshTokenUseCase implements IRefreshTokenUseCase{
    constructor(private _tokenService:ITokenService){}
    async  generateAccessToken(token: string): Promise<string> {
        const result= await this._tokenService.verifyRefreshToken(token)
         const { exp, iat, ...cleanPayload } =result as IUserTokenPayload;
        
        const AccessToken=await this._tokenService.generateToken(cleanPayload)
        console.log("Acccc",AccessToken)
        return AccessToken

    }
  }