import { UserProfileEditRequestDTO } from '../../../DTOs/user/profile/UserProfileEditRequestDTO';
import { UserProfileResponseDTO } from '../../../DTOs/user/profile/UserProfileResponseDTO';
import { ForbiddenError } from '../../../../domain/errors/userProfile';
import { IUserProfileRepository } from '../../../../domain/repositories/user/IUserProfileRepository';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { IUserProfileUseCase } from '../../../interface/useCases/user/IUserProfileUseCase';
import { IUserProfileMapper } from '../../../interface/useCases/user/mapper/IUserProfileMapper';
import { ErrorMessages } from '../../../../constants/errorMessages';

export class UserProfileUseCase implements IUserProfileUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _userProfileRepository: IUserProfileRepository,
    private _profileMapper: IUserProfileMapper
  ) {}

  async getUserProfile(userId: string): Promise<UserProfileResponseDTO> {
    const profileData = await Promise.all([
      this._userProfileRepository.fetchProfile(userId),
      this._userRepo.findUserById(userId),
    ]);
    const [profile, user] = profileData;

    const result = this._profileMapper.toResponseDto(user!, profile);

    return result;
  }
  async editProfileData(
    profileId: string,
    data: UserProfileEditRequestDTO
  ): Promise<UserProfileResponseDTO> {
    const userId = data.user?.userId;

    if (!userId) throw new ForbiddenError(ErrorMessages.USER.ID_REQUIRED);
    const { profile, user } = this._profileMapper.toDomainForUpdate(data);

    const updatedData = await Promise.all([
      this._userProfileRepository.updateProfile(profileId, profile),
      this._userRepo.updateUser(userId, user),
    ]);
    const [updatedProfile, updatedUser] = updatedData;
    return this._profileMapper.toResponseDto(updatedUser, updatedProfile);
  }
}
