
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { IOtpService } from '../../../infrastructure/interface/IOtpService';
import { IHashService } from '../../interface/user/IHashService';
import { IUserMapper } from '../../interface/user/IUserMapper';
import { IVerifyOtpUseCase } from '../../interface/user/IVerifyOtpUseCase';



export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private _userRepo:IUserRepository,
    private _otpService:IOtpService,
    private _hashService:IHashService,
    private _userMapper:IUserMapper

  ) {}

  

  async execute(email:string, otp:string) {
    console.log('otp is', otp);
    const userData = await this._otpService.verifyOtp(email, otp);
    userData.password = await this._hashService.hash(userData.password);
    console.log('user data is', userData);
    const userEntity = this._userMapper.toEntity(userData);
    const savedUser = await this._userRepo.createUser(userEntity);
    return this._userMapper.toResponse(savedUser);
  }


}
