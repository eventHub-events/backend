import { ITokenService } from '../../application/interface/useCases/user/ITokenService';
import { IAuthMiddleware } from '../../application/interface/useCases/user/IAuthMiddleware';
import { IDecodedUserPayload } from '../../domain/types/IDecodedUserPayload';
import { ErrorMessages } from '../../constants/errorMessages';

export class AuthMiddlewareService implements IAuthMiddleware {
  constructor(private _tokenService: ITokenService) {}
  async authenticateUser(token: string): Promise<IDecodedUserPayload> {
    try {
      
      const decoded = await this._tokenService.verifyToken(token);
    

      if (!decoded.id || !decoded.role) {
        throw new Error(ErrorMessages.TOKEN.INVALID_TOKEN_PAYLOAD);
      }

      return decoded as IDecodedUserPayload;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || ErrorMessages.TOKEN.TOKEN_DECODE_ERROR);
      }
      throw new Error(ErrorMessages.TOKEN.TOKEN_DECODE_ERROR);
    }
  }

  async validateRefreshToken(
    refreshToken: string
  ): Promise<IDecodedUserPayload> {
    try {
      const decoded = await this._tokenService.verifyRefreshToken(refreshToken);

      if (!decoded.id || !decoded.role) {
        throw new Error(ErrorMessages.TOKEN.INVALID_TOKEN_PAYLOAD);
      }

      return decoded as IDecodedUserPayload;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message ||ErrorMessages.TOKEN.TOKEN_DECODE_ERROR );
      }
      throw new Error(ErrorMessages.TOKEN.TOKEN_DECODE_ERROR);
    }
  }
}
