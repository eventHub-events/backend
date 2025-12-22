import { NextFunction, Request, Response } from 'express';
import { UserRegisterDTO } from '../../../application/DTOs/user/RegisterUserDTO';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { IRegisterUserUseCase } from '../../../application/interface/useCases/user/IRegisterUserUseCase';
import { IVerifyOtpUseCase } from '../../../application/interface/useCases/user/IVerifyOtpUseCase';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { IResendOtpUseCase } from '../../../application/interface/useCases/user/IResendOtpUseCase';
import { ILoginUserUseCase } from '../../../application/interface/useCases/user/ILoginUserUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { ILogoutUseCase } from '../../../application/interface/useCases/user/ILogoutUseCase';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { ErrorMessages } from '../../../constants/errorMessages';
import { CookieOptionsUtility } from '../../../utils/CookieOptions.utility';
import { BadRequestError } from '../../../domain/errors/common';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { COOKIE_NAMES } from '../../../infrastructure/constants/authentication/cookieNames';

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,
    private _resendOtpUseCase: IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _loginUserUseCase: ILoginUserUseCase,
    private _logoutUserUseCase: ILogoutUseCase
  ) {}

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: UserRegisterDTO = req.body;
      const result = await this._registerUserCase.execute(dto);

      res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success(result.message, HttpStatusCode.OK, result));
    } catch (err) {
      next(err);
    }
  }

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      const result = await this._resendOtpUseCase.execute(email);

      res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success(result, HttpStatusCode.OK, result));
    } catch (err) {
      next(err);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp } = req.body;

      const result = await this._verifyOtpUseCase.execute(email, otp);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.AUTHENTICATION.OTP.OTP_VERIFICATION_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(
            ApiResponse.error(ErrorMessages.AUTH.EMAIL_AND_PASSWORD_REQUIRED)
          );
      }

      const { token, refreshToken, user } =
        await this._loginUserUseCase.loginUser(email, password);

      const authCookieOptions = CookieOptionsUtility.create(15 * 60 * 1000);
      res.cookie( COOKIE_NAMES.AUTH_TOKEN, token, authCookieOptions);

      const refreshCookieOption = CookieOptionsUtility.create(
        7 * 24 * 60 * 60 * 1000
      );
      res.cookie( COOKIE_NAMES.REFRESH_TOKEN, refreshToken, refreshCookieOption);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.AUTHENTICATION.LOGIN.SUCCESS,
            HttpStatusCode.OK,
            user
          )
        );
    } catch (err) {
      if(err instanceof BadRequestError)throw new CustomError(err.message,HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }

  async logout(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this._logoutUserUseCase.execute();

      const cookieOptions = CookieOptionsUtility.create();
      res.clearCookie( COOKIE_NAMES.AUTH_TOKEN, cookieOptions);
      res.clearCookie( COOKIE_NAMES.REFRESH_TOKEN, cookieOptions);
      res
        .status(HttpStatusCode.OK)
        .json(ApiResponse.success(result, HttpStatusCode.OK));
    } catch (err) {
      next(err);
    }
  }
}
