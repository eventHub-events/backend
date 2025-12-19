import { UserProfileEditRequestDTO } from '../../../../DTOs/user/profile/UserProfileEditRequestDTO';
import { UserProfileResponseDTO } from '../../../../DTOs/user/profile/UserProfileResponseDTO';
import { UserEntity } from '../../../../../domain/entities/User';
import { UserProfileEntity } from '../../../../../domain/entities/user/UserProfile';

export interface IUserProfileMapper {
  toDomainForUpdate(data: UserProfileEditRequestDTO): {
    profile: Partial<UserProfileEntity>;
    user: Partial<UserEntity>;
  };
  toResponseDto(
    userData: UserEntity,
    profileData: UserProfileEntity
  ): UserProfileResponseDTO;
}
