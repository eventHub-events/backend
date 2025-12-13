import { NextFunction, Response } from 'express';
import { IRefreshTokenUseCase } from '../../../application/interface/useCases/user/IRefreshTokenUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class TokenController {
  constructor(private _generateAccessTokenUseCase: IRefreshTokenUseCase) {}

  async refreshAccessToken(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;

      const accessToken =
        await this._generateAccessTokenUseCase.generateAccessToken(
          refreshToken
        );

      res.cookie('authToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      return res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.AUTHENTICATION.TOKEN.ACCESS_TOKEN_CREATION_SUCCESS
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
