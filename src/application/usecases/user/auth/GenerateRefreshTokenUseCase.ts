import { IUserTokenPayload } from '../../../../infrastructure/interface/IUserTokenPayload';
import { IRefreshTokenUseCase } from '../../../interface/useCases/user/IRefreshTokenUseCase';
import { ITokenService } from '../../../interface/useCases/user/ITokenService';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private _tokenService: ITokenService) {}
  async generateAccessToken(token: string): Promise<string> {
    const result = await this._tokenService.verifyRefreshToken(token);
    const { exp, iat, ...cleanPayload } = result as IUserTokenPayload;
    console.log(exp, iat);

    const accessToken = await this._tokenService.generateToken(cleanPayload);

    return accessToken;
  }
}
