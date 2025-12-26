import { ErrorMessages } from "../../../../constants/errorMessages";
import { BadRequestError, NotFoundError } from "../../../../domain/errors/common";
import { ForbiddenError } from "../../../../domain/errors/userProfile";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { IOtpService } from "../../../../infrastructure/interface/IOtpService";
import { ISetPasswordWithOtpUseCase } from "../../../interface/useCases/common/password-set/ISetPasswordWithOtpUseCase";
import { IHashService } from "../../../interface/useCases/user/IHashService";
import { ITokenService } from "../../../interface/useCases/user/ITokenService";

export class SetPasswordWithOtpUseCase implements ISetPasswordWithOtpUseCase {
  constructor(
     private _userRepo : IUserRepository,
     private _otpService : IOtpService,
     private _tokenService : ITokenService,
     private _hashService : IHashService
  ){}

 async execute(token: string, otp: string, newPassword: string,userId :string): Promise<void> {

     const verifiedToken = await this._tokenService.verifyToken(token);
     if(verifiedToken.scope !=="SET_PASSWORD") throw new ForbiddenError(ErrorMessages.AUTH.INVALID_TOKEN);
 
       const user = await this._userRepo.findUserById(userId);
        if(!user) throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);
         console.log("otp for verification is", otp)
        await this._otpService.verifyOtp(user.email,otp);
        if(user.hasPassword)throw new BadRequestError(ErrorMessages.AUTH.PASSWORD_ERROR);

        const hashedPassword = await this._hashService.hash(newPassword);
        user.password = hashedPassword;
        user.hasPassword = true;

        await this._userRepo.updateUser(userId,user);




 }
}