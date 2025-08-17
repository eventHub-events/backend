import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { ICacheService } from "../../../infrastructure/interface/ICacheService";
import { ILoggerService } from "../../interface/common/ILoggerService";
import { IEmailService } from "../../interface/user/IEmailService";
import { IForgetPasswordUseCase } from "../../interface/user/IForgetPasswordUsecase";
import { IGenerateOtpUseCase } from "../../interface/user/IGenerateOtpUseCase";

export class ForgetPasswordUseCase implements IForgetPasswordUseCase {
  constructor(
    private _otpService: IGenerateOtpUseCase,
    private _userRepository: IUserRepository,
    private _loggerService: ILoggerService,
    private _emailService: IEmailService,
    private _cacheService:ICacheService
  ) {}
  async forgetPassword(dto: ForgetPasswordDTO): Promise<{ message: string }> {
    this._loggerService.info(
      `User with email ${dto.email} is going to resetPassword`
    );
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user) {
      this._loggerService.warn("user not found");
      throw new Error("User not found");
    }
    
    const otp = await this._otpService.executeForForgetPassword(
      dto.email,
      user
    );
    await this._cacheService.set(`otp:reset:${otp}`, 500, dto.email);

    console.log("reset password otp", otp);
    await this._emailService.sendMail(
      dto.email,
      "Your OTP code",
      `<h2> your OTP is ${otp}</h2>`
    );

    return { message: "OTP sent successfully" };
  }
}
