
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { IOtpService } from '../../../infrastructure/interface/IOtpService';
import { IHashService } from '../../interface/user/IHashService';
import { IVerifyOtpUseCase } from '../../interface/user/IVerifyOtpUseCase';
import { UserMapper } from '../../mapper/user/UserMapper';


export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private _userRepo:IUserRepository,
    private _otpService:IOtpService,
    private _hashService:IHashService,

  ) {}

  

  async execute(email:string, otp:string) {
    console.log('otp is', otp);
    const userData = await this._otpService.verifyOtp(email, otp);
    userData.isVerified = true;
    userData.password = await this._hashService.hash(userData.password);
    console.log('user data is', userData);
    const userEntity = UserMapper.toEntity(userData);
    const savedUser = await this._userRepo.createUser(userEntity);
    return UserMapper.toResponse(savedUser);
  }


}
