import { NextFunction, Response } from 'express';
import { IAuthMiddleware } from '../../application/interface/useCases/user/IAuthMiddleware';
import { HttpStatusCode } from '../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../infrastructure/commonResponseModel/ApiResponse';
import { IAuthenticatedRequest } from '../../infrastructure/interface/IAuthenticatedRequest';
import { IRefreshTokenUseCase } from '../../application/interface/useCases/user/IRefreshTokenUseCase';
import { ErrorMessages } from '../../constants/errorMessages';
import { TokenTypes } from '../../infrastructure/types/common/tokenTypes';

export class AuthenticationMiddleWare {
  constructor(
    private _authMiddlewareService: IAuthMiddleware,
    private _refreshTokenUseCase: IRefreshTokenUseCase
  ) {}

  async authenticateUser(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let accessToken = req.cookies?.authToken;
      const refreshToken = req.cookies?.refreshToken;
      if (!accessToken && refreshToken) {
        const token =
          await this._refreshTokenUseCase.generateAccessToken(refreshToken);
        res.cookie(TokenTypes.AUTH_TOKEN, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: 15 * 60 * 1000,
        });

        accessToken = token;
      }
      if (!refreshToken && accessToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(ApiResponse.error(ErrorMessages.AUTH.UNAUTHORIZED,));
      }

      const resetToken = req.cookies?.resetToken ?? null;

      const decoded =
        await this._authMiddlewareService.authenticateUser(accessToken);
      req.user = decoded;
      req.resetToken = resetToken;
      next();
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          ApiResponse.error(
            
            ErrorMessages.TOKEN.INVALID_TOKEN
          )
        );
    }
  }
  async authenticateChangePassword(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const resetToken = req.cookies?.resetToken ?? null;
      
      if (!resetToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            ApiResponse.error(
              ErrorMessages.AUTH.UNAUTHORIZED_PASSWORD_RESET,
              
            )
          );
      }
    
      const decoded =
        await this._authMiddlewareService.authenticateUser(resetToken);
       
      req.user = decoded;
      req.resetToken = resetToken;
      next();
    } catch (Err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          ApiResponse.error(
            ErrorMessages.TOKEN.INVALID_TOKEN
           
          )
        );
    }
  }

  async validateRefreshToken(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            ApiResponse.error(
              ErrorMessages.TOKEN.REFRESH_TOKEN_MISSING,
             
            )
          );
      }
      const decoded =
        await this._authMiddlewareService.validateRefreshToken(refreshToken);
      req.refreshToken = refreshToken;
      req.user = decoded;
      next();
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : ErrorMessages.TOKEN.REFRESH_TOKEN_INVALID;
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(ApiResponse.error(errMessage));
    }
  }
}
