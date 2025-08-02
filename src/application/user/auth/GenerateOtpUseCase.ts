import { UserRegisterDTO } from "../../../domain/dtos/user/RegisterUserDTO";
import { IOtpService } from "../../../infrastructure/interface/IOtpService";
import { IGenerateOtpUseCase } from "../../interface/user/IGenerateOtpUseCase";

export class GenerateOtpUseCase implements IGenerateOtpUseCase {
  constructor(private _otpService:IOtpService){}

  async execute(email:string,data:UserRegisterDTO):Promise<string>{
    const otp=await this._otpService.generateOtp(email,data);
    return otp;
  }
  async reExecute(email: string): Promise<string> {
      const otp=await this._otpService.reGenerateOtp(email)
      return otp
  }
}