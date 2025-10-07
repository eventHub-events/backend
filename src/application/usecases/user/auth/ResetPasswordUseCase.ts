
import { UserRegisterDTO } from "../../../../domain/dtos/user/RegisterUserDTO";
import { ResetPasswordOtpDTO } from "../../../../domain/dtos/user/ResetPasswordDTO";
import { UserResponseDTO } from "../../../../domain/dtos/user/UserResponseDTO";
import { CustomError } from "../../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../../infrastructure/interface/enums/HttpStatusCode";
import { ICacheService } from "../../../../infrastructure/interface/ICacheService";
import { IOtpService } from "../../../../infrastructure/interface/IOtpService";

import { IHashService } from "../../../interface/user/IHashService";
import {  IVerifyResetPasswordOtpUseCase } from "../../../interface/user/IResetPasswordOTPUseCase";
import { ITokenService } from "../../../interface/user/ITokenService";

export class VerifyResetPasswordOtpUseCase implements IVerifyResetPasswordOtpUseCase{
  constructor(private _otpService : IOtpService,
              private _hashingService:IHashService,
              private _tokenService :ITokenService,
              private _cacheService:ICacheService){}
  async resetPassword(data:ResetPasswordOtpDTO): Promise<{user:UserRegisterDTO,token:string}> {

    const{otp}=data;
     if(!otp){
        throw new CustomError("Otp is required", HttpStatusCode.BAD_REQUEST);
     }
    const email=await this._cacheService.get(`otp:reset:${otp}`)
     if (!email) {
      throw new CustomError("OTP expired or invalid",HttpStatusCode.BAD_REQUEST);
    }
   const user= await  this._otpService.verifyOtp(email,otp) 
   const payload={email,type:"reset"}
   const token= await this._tokenService.generateResetToken(payload)

 
      return  {user,token}
  }
}
