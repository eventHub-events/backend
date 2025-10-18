
import { UserProfileEditRequestDTO } from "../../../domain/DTOs/user/profile/UserProfileEditRequestDTO";
import { UserProfileResponseDTO } from "../../../domain/DTOs/user/profile/UserProfileResponseDTO";
import { User } from "../../../domain/entities/User";
import { UserProfileEntity } from "../../../domain/entities/user/UserProfile";
import { IUserProfileMapper } from "../../interface/useCases/user/mapper/IUserProfileMapper";

export class UserProfileMapper implements IUserProfileMapper {
  toDomainForUpdate(data:UserProfileEditRequestDTO): { profile:Partial<UserProfileEntity>, user: Partial<User> } {
      const user = {
         id: data.user?.userId,
         name: data.user?.name,
         email: data.user?.email,
         phone: Number(data.user?.phone)
      }
      const profile= {
         address: data.profile?.address,
         image: data.profile?.image,
         twoFAEnabled: data.profile?.twoFAEnabled, 
         favorites: data.profile?.favorites
      }
      return {
        profile,
        user
      }
  }
  toResponseDto(userData: User, profileData: UserProfileEntity): UserProfileResponseDTO {
     const userProfileData = {
       name: userData.name,
       email: userData.email,
       phone: userData. phone.toString(),
       profileId : profileData.profileId ,
       address : profileData.address,
       image:   profileData.image,
       memberSince: profileData.memberSince  ? profileData.memberSince.toLocaleDateString("en-US", { month: "short", year: "numeric" }):undefined,
       twoFAEnabled: profileData.twoFAEnabled,
       favorites: profileData.favorites

     }
     return  userProfileData
     
  }
}