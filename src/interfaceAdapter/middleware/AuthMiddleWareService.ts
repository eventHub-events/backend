import { ITokenService } from '../../application/interface/useCases/user/ITokenService';
import { IAuthMiddleware } from '../../application/interface/useCases/user/IAuthMiddleware';
import { IDecodedUserPayload } from '../../domain/types/IDecodedUserPayload';

export class AuthMiddlewareService implements IAuthMiddleware {
  constructor(private _tokenService: ITokenService) {}
  async authenticateUser(token: string): Promise<IDecodedUserPayload> {
    try {
      const decoded = await this._tokenService.verifyToken(token);
      
      if (!decoded.id || !decoded.role) {
        throw new Error('Invalid token payload');
      }

      return decoded as IDecodedUserPayload;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || 'Error in decoding the token');
      }
      throw new Error('Error in decoding the token');
    }
  }

  async validateRefreshToken(
    refreshToken: string
  ): Promise<IDecodedUserPayload> {
    try {
      const decoded = await this._tokenService.verifyRefreshToken(refreshToken);
      
      if (!decoded.id || !decoded.role) {
        throw new Error('Invalid token payload');
      }

      return decoded as IDecodedUserPayload;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || 'Error in  decoding the token');
      }
      throw new Error('Error in decoding the token');
    }
  }
}
