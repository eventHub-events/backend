import { ErrorMessages } from "../../../../constants/errorMessages";
import { BadRequestError, CreationFailedError, NotFoundError } from "../../../../domain/errors/common";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { IOtpService } from "../../../../infrastructure/interface/IOtpService";
import { IPasswordSetOtpTemplate } from "../../../../infrastructure/interface/Templates/IPasswordSetOtpTemplate";
import { IRequestPasswordSetOTPUseCase } from "../../../interface/useCases/common/password-set/IRequestPasswordSetOTPUseCase";
import { IEmailService } from "../../../interface/useCases/user/IEmailService";
import { ITokenService } from "../../../interface/useCases/user/ITokenService";

export class RequestPasswordSetOTPUseCase implements IRequestPasswordSetOTPUseCase {
    
       constructor(
          private _userRepo : IUserRepository,
          private _TokenService : ITokenService,
          private _otpService : IOtpService,
          private _emailService : IEmailService,
          private _OtpTemplate : IPasswordSetOtpTemplate
       ){}
  async execute(userId: string): Promise<{  setPasswordToken: string; }> {
      
    const user = await this._userRepo.findUserById(userId);
          if(!user) throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);
          if(user.hasPassword)throw new BadRequestError(ErrorMessages.AUTH.PASSWORD_ERROR);

          const otp = await this._otpService.generateOtp(user.email);
                if(!otp) throw new CreationFailedError(ErrorMessages.AUTH.OTP_GENERATION_ERROR);

       const token = await this._TokenService.generateToken ({id: user.id,scope: "SET_PASSWORD"});
                 if(!token)  throw new  CreationFailedError(ErrorMessages.TOKEN.CREATION_FAILED_ERROR);

         const template = this._OtpTemplate.generate({
            userName : user.name,
            otp: otp,

         });


              await this._emailService.sendMail(
              user.email,
              template.subject,
              template.html
               )
     
    return {
      
       setPasswordToken : token
    }
      
      

  }
}