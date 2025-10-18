


export interface IRefreshTokenUseCase{
  generateAccessToken(token:string):Promise<string>
}