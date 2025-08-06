import { UserRegisterDTO } from '../../../domain/dtos/user/RegisterUserDTO';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { IOtpService } from '../../../infrastructure/interface/IOtpService';
import { IEmailService } from '../../interface/user/IEmailService';
import { IGenerateOtpUseCase } from '../../interface/user/IGenerateOtpUseCase';
import { IRegisterUserUseCase } from '../../interface/user/IRegisterUserUsecase';

import { GenerateOtpUseCase } from './GenerateOtpUseCase';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _generateOtpUseCase:IGenerateOtpUseCase,
    private _emailService:IEmailService,
  ) {}

  async execute(data: UserRegisterDTO) {
    const existing = await this._userRepo.findByEmail(data.email);
    if (existing) throw new Error('User already  exists');
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
