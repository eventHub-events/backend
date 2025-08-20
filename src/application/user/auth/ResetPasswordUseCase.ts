
import { ResetPasswordOtpDTO } from "../../../domain/dtos/user/ResetPasswordDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { ICacheService } from "../../../infrastructure/interface/ICacheService";
import { IOtpService } from "../../../infrastructure/interface/IOtpService";

import { IHashService } from "../../interface/user/IHashService";
import {  IVerifyResetPasswordOtpUseCase } from "../../interface/user/IResetPasswordOTPUseCase";
import { ITokenService } from "../../interface/user/ITokenService";

export class VerifyResetPasswordOtpUseCase implements IVerifyResetPasswordOtpUseCase{
  constructor(private _otpService :IOtpService, private _hashingService:IHashService,private _tokenService :ITokenService, private _cacheService:ICacheService){}
  async resetPassword(data:ResetPasswordOtpDTO): Promise<{user:UserResponseDTO,token:string}> {

    const{otp}=data
    const email=await this._cacheService.get(`otp:reset:${otp}`)
     if (!email) {
      throw new Error("OTP expired or invalid");
    }
   const user= await  this._otpService.verifyOtp(email,otp)
   const payload={email,type:"reset"}
   const token= await this._tokenService.generateResetToken(payload)

 
      return  {user,token}
  }
}
