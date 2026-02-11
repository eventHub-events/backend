import { ForgetPasswordDTO } from '../../../DTOs/user/ForgetPasswordDTO';
import { ForgetPasswordResponseDTO } from '../../../DTOs/user/ForgetPasswordResponseDTO';
import { UserRegisterDTO } from '../../../DTOs/user/RegisterUserDTO';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { RESETPASSWORD_OTP_TLL } from '../../../../infrastructure/constants/forgetPassword';
import { CustomError } from '../../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../../infrastructure/interface/enums/HttpStatusCode';
import { ICacheService } from '../../../../infrastructure/interface/ICacheService';
import { ILoggerService } from '../../../interface/common/ILoggerService';
import { IEmailService } from '../../../interface/useCases/user/IEmailService';
import { IForgetPasswordUseCase } from '../../../interface/useCases/user/IForgetPasswordUseCase';
import { IGenerateOtpUseCase } from '../../../interface/useCases/user/IGenerateOtpUseCase';
import { IUserMapper } from '../../../interface/useCases/user/mapper/IUserMapper';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { ErrorMessages } from '../../../../constants/errorMessages';

export class ForgetPasswordUseCase implements IForgetPasswordUseCase {
  constructor(
    private _otpService: IGenerateOtpUseCase,
    private _userRepository: IUserRepository,
    private _loggerService: ILoggerService,
    private _emailService: IEmailService,
    private _userMapper: IUserMapper,
    private _cacheService: ICacheService
  ) {}
  async forgetPassword(
    data: ForgetPasswordDTO
  ): Promise<ForgetPasswordResponseDTO> {
    const userDto = new ForgetPasswordDTO(data);

    this._loggerService.info(
      `User with email ${userDto.email} is going to resetPassword`
    );

    const user = await this._userRepository.findByEmail(userDto.email);

    if (!user) {
      this._loggerService.warn(ErrorMessages.USER.NOT_FOUND);
      throw new CustomError(
        ErrorMessages.USER.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const userData = this._userMapper.toResponseDTO(user);

    const otp = await this._otpService.executeForForgetPassword(
      userDto.email,
      userData as UserRegisterDTO
    );

    await this._cacheService.set(
      `otp:reset:${otp}`,
      RESETPASSWORD_OTP_TLL,
      userDto.email
    );

    console.log('reset password otp', otp);

    await this._emailService.sendMail(
      userDto.email,
      'Password Reset OTP',
      `<h2> your OTP is ${otp}</h2>`
    );

    return { message: ResponseMessages.AUTHENTICATION.OTP.OTP_SENT_SUCCESS };
  }
}
