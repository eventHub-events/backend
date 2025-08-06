import { IUserTokenPayload } from "../../../infrastructure/interface/IUserTokenPayload"


export interface IRefreshTokenUseCase{
  generateAccessToken(token:string):Promise<string>
}