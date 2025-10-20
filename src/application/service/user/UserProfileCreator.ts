import { IUserProfileRepository } from "../../../domain/repositories/user/IUserProfileRepository";
import { IProfileCreator } from "../../interface/common/IProfileCreator";

export class UserProfileCreator implements IProfileCreator {
  constructor(private _userProfileRepo: IUserProfileRepository){}

  async createProfile(userId: string): Promise<void> {
     
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

      })
  }
}