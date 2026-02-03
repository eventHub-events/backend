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
import { IRequestPasswordSetOTPUseCase } from '../../../application/interface/useCases/common/password-set/IRequestPasswordSetOTPUseCase';
import { ISetPasswordWithOtpUseCase } from '../../../application/interface/useCases/common/password-set/ISetPasswordWithOtpUseCase';



export class PasswordController {
  constructor(
    private _forgetPasswordUseCase: IForgetPasswordUseCase,
    private _verifyResetPasswordUseCase: IVerifyResetPasswordOtpUseCase,
    private _changePasswordUseCase: IChangePasswordUseCase,
    private _requestPasswordSetOTPUseCase : IRequestPasswordSetOTPUseCase,
    private _setPasswordWithOtpUseCase : ISetPasswordWithOtpUseCase

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
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async sendPasswordSetOTP(req :IAuthenticatedRequest, res :Response, next :NextFunction) : Promise<void> {
    try{
           const userId = req.user?.id;
           if(!userId) throw new CustomError(ErrorMessages.USER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

         const { setPasswordToken }    = await this._requestPasswordSetOTPUseCase.execute(userId);
          const resetTokenOptions = CookieOptionsUtility.create(2 * 60 * 1000);
         res.cookie('passwordSetToken', setPasswordToken, resetTokenOptions);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.AUTHENTICATION.OTP.OTP_SENT_SUCCESS,HttpStatusCode.OK));
      
         
    }catch(err){
       next(err)
    }
  }
  async setPasswordWithOtp(req : IAuthenticatedRequest, res :Response, next :NextFunction) : Promise<void> {
     try{
            const userId = req.user?.id;
             if(!userId) throw new CustomError(ErrorMessages.USER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

             const {otp,newPassword} = req. body;
            

             const token = req.cookies.passwordSetToken;
             if(!token) throw new CustomError(ErrorMessages.AUTH.TOKEN_NOT_FOUND,HttpStatusCode.BAD_REQUEST);
          
             await this._setPasswordWithOtpUseCase.execute(token, otp,newPassword,userId);
         res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.AUTHENTICATION.PASSWORD.PASSWORD_UPDATE_SUCCESS,HttpStatusCode.OK));
          

          
     }catch(err){
       next(err)
     }
  }
}
