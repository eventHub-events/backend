
import { IUserProfileRepository } from "../../../../domain/repositories/user/IUserProfileRepository";
import { ResponseMessages } from "../../../../infrastructure/constants/responseMessages";
import { IUserBlankProfileCreationUseCase } from "../../../interface/useCases/user/user-profile/IUserBlankProfileCreationUseCase";

export class UserBlankProfileCreationUseCase implements  IUserBlankProfileCreationUseCase {
  constructor(
       private _userProfileRepo : IUserProfileRepository
  ){}
 async  createBlankProfile(userId: string): Promise<string> {
          
          await this._userProfileRepo.createProfile({
       
        user: userId,
        name : "",
        address: {
           line1:  "",
           line2: "",
           city:  "",
           state: "",
           country: "",
           pin: ""
           },
        memberSince: new Date(),
        image:  "",
        twoFAEnabled: false,
         favorites:[]

        });
       

    return ResponseMessages.USER.PROFILE.USER_PROFILE_CREATE_SUCCESS;
  }
}