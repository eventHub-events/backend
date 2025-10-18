import { UserRegisterDTO } from '../../../../domain/DTOs/user/RegisterUserDTO';
import { UserRegisterResponseDTO } from '../../../../domain/DTOs/user/UserRegisterResponseDTO';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../../infrastructure/interface/enums/HttpStatusCode';
import { IEmailService } from '../../../interface/user/IEmailService';
import { IGenerateOtpUseCase } from '../../../interface/user/IGenerateOtpUseCase';
import { IRegisterUserUseCase } from '../../../interface/user/IRegisterUserUsecase';



export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _generateOtpUseCase: IGenerateOtpUseCase,
    private _emailService: IEmailService,
  ) {}

  async execute(data: UserRegisterDTO ): Promise< UserRegisterResponseDTO > {

    const existing = await this._userRepo.findByEmail(data.email);

    if (existing) throw new CustomError('User already  exists',HttpStatusCode.BAD_REQUEST );

    const otp = await this._generateOtpUseCase.execute(data.email, data);
    console.log(` OTP for ${data.email}: ${otp}`);
    await this._emailService.sendMail(
      data.email,
      'Your OTP code',
      `<h2> your OTP is ${otp}</h2>`,
    );
    return { message: 'OTP sent successfully' };
  }
}
