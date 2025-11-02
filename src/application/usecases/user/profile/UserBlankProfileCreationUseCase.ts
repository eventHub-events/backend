import { IUserProfileRepository } from "../../../../domain/repositories/user/IUserProfileRepository";
import { IUserBlankProfileCreationUseCase } from "../../../interface/useCases/user/user-profile/IUserBlankProfileCreationUseCase";

export class UserBlankProfileCreationUseCase implements  IUserBlankProfileCreationUseCase {
  constructor(
       private _userProfileRepo : IUserProfileRepository
  ){}
 async  createBlankProfile(userId: string): Promise<string> {
          
    const profile =       await this._userProfileRepo.createProfile({
       
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

    return "UserProfileCreatedSuccessfully"
  }
}