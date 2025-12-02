import { UserRegisterDTO } from '../../../DTOs/user/RegisterUserDTO';
import { UserRegisterResponseDTO } from '../../../DTOs/user/UserRegisterResponseDTO';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../../infrastructure/interface/enums/HttpStatusCode';
import { IEmailService } from '../../../interface/useCases/user/IEmailService';
import { IGenerateOtpUseCase } from '../../../interface/useCases/user/IGenerateOtpUseCase';
import { IRegisterUserUseCase } from '../../../interface/useCases/user/IRegisterUserUsecase';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { ErrorMessages } from '../../../../constants/errorMessages';



export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _generateOtpUseCase: IGenerateOtpUseCase,
    private _emailService: IEmailService,
  ) {}

  async execute(data: UserRegisterDTO ): Promise< UserRegisterResponseDTO > {

    const existing = await this._userRepo.findByEmail(data.email);

    if (existing) throw new CustomError(ErrorMessages.USER.USER_ALREADY_EXITS,HttpStatusCode.BAD_REQUEST );

    const otp = await this._generateOtpUseCase.execute(data.email, data);
    console.log(` OTP for ${data.email}: ${otp}`);
    await this._emailService.sendMail(
      data.email,
      'Your OTP code',
      `<h2> your OTP is ${otp}</h2>`,
    );
    return { message: ResponseMessages.AUTHENTICATION.OTP.OTP_SENT_SUCCESS };
  }
}
