import { Request, Response } from 'express';
import { RegisterUserUsecase } from '../../../application/user/auth/RegisterUserUsecase';
import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { VerifyOtpUseCase } from '../../../application/user/auth/VerifyOtpUseCase';
import { IRegisterUserUseCase } from '../../../application/interface/user/IRegisterUserUsecase';
import { IVerifyOtpUseCase } from '../../../application/interface/user/IVerifyOtpUseCase';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { IResendOtpUseCase } from '../../../application/interface/user/IResendOtpUseCase';

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,

    private _resendOtpUseCase:IResendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = new UserRegisterDTO(req.body);
      const result = await this._registerUserCase.execute(dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message));
    } catch (err: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error(err.message));
    }
  }

  async resendOtp(req:Request, res:Response) {
    try {
      console.log('resend otp working');
      const { email } = req.body;
      console.log('email in resent otp', email);
      const result = await this._resendOtpUseCase.execute(email);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result));
    } catch (err:any) {
      res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error(err.message));
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const result = await this._verifyOtpUseCase.execute(email, otp);
      console.log('result after verification', result);
      return res.status(HttpStatusCode.OK).json(ApiResponse.success(
        'OTP verified successfully',
        result,
      ));
    } catch (err: any) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(err.message));
    }
  }
}
