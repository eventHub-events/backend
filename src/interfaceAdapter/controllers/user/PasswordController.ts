import { NextFunction, Request, Response } from 'express';
import { IForgetPasswordUseCase } from '../../../application/interface/useCases/user/IForgetPasswordUseCase';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { IVerifyResetPasswordOtpUseCase } from '../../../application/interface/useCases/user/IResetPasswordOTPUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { IChangePasswordUseCase } from '../../../application/interface/useCases/user/IChangePasswordUseCase';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { ChangePasswordDTO } from '../../../application/DTOs/user/ChangePasswordDTO';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { CookieOptionsUtility } from '../../../utils/CookieOptions.utility';

export class PasswordController {
  constructor(
    private _forgetPasswordUseCase: IForgetPasswordUseCase,
    private _verifyResetPasswordUseCase: IVerifyResetPasswordOtpUseCase,
    private _changePasswordUseCase: IChangePasswordUseCase
  ) {}

  requestForgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const result = await this._forgetPasswordUseCase.forgetPassword(req.body);
      return res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.AUTHENTICATION.PASSWORD
              .PASSWORD_RESET_INITIALIZATION,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  };

  async verifyResetPasswordOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { user, token } =
        await this._verifyResetPasswordUseCase.resetPassword(req.body);

      if (user) {
        const resetTokenOptions = CookieOptionsUtility.create(5 * 60 * 1000);
        res.cookie('resetToken', token, resetTokenOptions);

        return res
          .status(HttpStatusCode.OK)
          .json(
            ApiResponse.success(
              ResponseMessages.AUTHENTICATION.OTP.OTP_VERIFICATION_SUCCESS,
              HttpStatusCode.OK,
              user
            )
          );
      }
    } catch (err) {
      next(err);
    }
  }
  async changePassword(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const token = req.resetToken;
      if (!token) {
        throw new CustomError(
          ErrorMessages.AUTH.INVALID_TOKEN,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      const dto: ChangePasswordDTO = req.body;
      const result = await this._changePasswordUseCase.changePassword(
        dto,
        token
      );
      return res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.AUTHENTICATION.PASSWORD.PASSWORD_CHANGE_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
