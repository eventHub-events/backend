import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { ILoggerService } from "../../interface/common/ILoggerService";
import { IEmailService } from "../../interface/user/IEmailService";
import { IForgetPasswordUseCase } from "../../interface/user/IForgetPasswordUsecase";
import { IGenerateOtpUseCase } from "../../interface/user/IGenerateOtpUseCase";
import { UserMapper } from "../../mapper/user/UserMapper";

export class ForgetPasswordUseCase implements IForgetPasswordUseCase{
  constructor(private _otpService:IGenerateOtpUseCase,private _userRepository:IUserRepository,private _loggerService:ILoggerService, private _emailService:IEmailService){}
   async forgetPassword(id: string, email: string): Promise<string> {
     this._loggerService.info(`User with email ${email} is going to resetPassword`)
      const user= await  this._userRepository.findByEmail(email)
      if(!user){
        this._loggerService.warn("user not found")
        throw new Error("User not found")
      }
      
      const otp= await this._otpService.executeForForgetPassword(email,user)
      console.log("reset password otp",otp)
    await this._emailService.sendMail(  email,
      'Your OTP code',
      `<h2> your OTP is ${otp}</h2>`,)
      
      return `message: 'OTP sent successfully`;
  }

}