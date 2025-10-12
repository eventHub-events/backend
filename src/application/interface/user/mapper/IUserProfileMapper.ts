import { UserProfileEditRequestDTO } from "../../../../domain/dtos/user/profile/UserProfileEditRequestDTO";
import { UserProfileResponseDTO } from "../../../../domain/dtos/user/profile/UserProfileResponseDTO";
import { User } from "../../../../domain/entities/User";
import { UserProfileEntity } from "../../../../domain/entities/user/UserProfile";

export interface IUserProfileMapper{
   toDomainForUpdate(data:UserProfileEditRequestDTO): { profile:Partial<UserProfileEntity>, user: Partial<User> };
  toResponseDto( userData: User, profileData: UserProfileEntity): UserProfileResponseDTO;
}