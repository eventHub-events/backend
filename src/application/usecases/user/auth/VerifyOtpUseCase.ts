
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { IOtpService } from '../../../../infrastructure/interface/IOtpService';
import { IProfileCreator } from '../../../interface/common/IProfileCreator';
import { IHashService } from '../../../interface/useCases/user/IHashService';
import { IUserMapper } from '../../../interface/useCases/user/mapper/IUserMapper';
import { IVerifyOtpUseCase } from '../../../interface/useCases/user/IVerifyOtpUseCase';



export class VerifyOtpUseCase implements IVerifyOtpUseCase {

   private _profileCreators: Record<string, IProfileCreator>;
  constructor(
    private _userRepo:IUserRepository,
    private _otpService:IOtpService,
    private _hashService:IHashService,
    private _userMapper:IUserMapper,
  
    profileCreators : Record<string,IProfileCreator>

  ) {
    this._profileCreators = profileCreators ;
  }

  

  async execute(email:string, otp:string) {
    console.log('otp is', otp);
    const userData = await this._otpService.verifyOtp(email, otp);
    userData.password = await this._hashService.hash(userData.password);
  
    const userEntity = this._userMapper.toEntity(userData);
    
    const savedUser = await this._userRepo.createUser(userEntity);
    const userResponseData= this._userMapper.toResponse(savedUser)
    const userId= userResponseData.id;
    const creator = this._profileCreators[savedUser.role];
    if(creator && userId) {
       await creator.createProfile(userId)
    }


   
    return userResponseData
  }


}
