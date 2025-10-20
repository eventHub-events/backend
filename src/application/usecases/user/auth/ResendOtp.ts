import { IEmailService } from '../../../interface/useCases/user/IEmailService';
import { IGenerateOtpUseCase } from '../../../interface/useCases/user/IGenerateOtpUseCase';
import { IResendOtpUseCase } from '../../../interface/useCases/user/IResendOtpUseCase';


export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(private _otpService:IGenerateOtpUseCase, private _emailService: IEmailService) {}

  async execute(email:string):Promise<string> {
    console.log('resent otp email in  ', email);
    const userData = await this._otpService.reExecute(email);
    console.log('userdata new hello', userData);
    if (!userData) throw new Error('User not found or otp expired');
    const newOtp = await this._otpService.execute(email, userData);
    await this._emailService.sendMail(
      email,
      'Your OTP Code',
      `<p>Your new OTP is <b>${newOtp}</b>. It will expire in 2 minutes.</p>`,
    );

    return 'OTP resent successfully!';
  }
}
