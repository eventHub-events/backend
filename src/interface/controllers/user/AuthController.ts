import { RegisterUserUsecase } from "../../../application/user/auth/RegisterUserUsecase";
import { Request, Response } from "express";
import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { VerifyOtpUseCase } from "../../../application/user/auth/VerifyOtpUseCase";
import { IRegisterUserUseCase } from "../../../application/interface/user/IRegisterUserUsecase";
import { IVerifyOtpUseCase } from "../../../application/interface/user/IVerifyOtpUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class AuthController {
  constructor(
    private _registerUserCase: IRegisterUserUseCase,
    

    private _verifyOtpUseCase: IVerifyOtpUseCase
  ) {}
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const dto = new UserRegisterDTO(req.body);
      const result = await this._registerUserCase.execute(dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(result.message),);
    } catch (err: any) {
      console.log("otp err", err);

      res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error(err.message));
    }
  }
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const result = await this._verifyOtpUseCase.execute(email, otp);
      return res.status(HttpStatusCode.OK).json(ApiResponse.success( "OTP verified successfully",
        result
      ))
    } catch (err: any) {
      console.log("otp err", err);

      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error(  err.message ));
    }
  }
}
