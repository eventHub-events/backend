import { ForgetPasswordDTO } from "../../../domain/dtos/user/ForgetPasswordDTO";
import { ForgetPasswordResponseDTO } from "../../../domain/dtos/user/ForgetPasswordResponseDTO";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { RESETPASSWORD_OTP_TLL } from "../../../infrastructure/constants/forgetPassword";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
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
  async forgetPassword(data: ForgetPasswordDTO): Promise<ForgetPasswordResponseDTO> {
    const userDto = new ForgetPasswordDTO(data)
    this._loggerService.info(
      `User with email ${userDto.email} is going to resetPassword`
    );
    const user = await this._userRepository.findByEmail(userDto.email);

    if (!user) {
      this._loggerService.warn("user not found");
      throw new CustomError("User not found",HttpStatusCode.NOT_FOUND);
    }
    
    const otp = await this._otpService.executeForForgetPassword(
      userDto.email,
      user
    );
    await this._cacheService.set(`otp:reset:${otp}`, RESETPASSWORD_OTP_TLL, userDto.email);

    console.log("reset password otp", otp);
    await this._emailService.sendMail(
      userDto.email,
      "Your OTP code",
      `<h2> your OTP is ${otp}</h2>`
    );

    return { message: "OTP sent successfully" };
  }
}
