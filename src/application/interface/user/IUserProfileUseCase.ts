import { UserProfileEditRequestDTO } from "../../../domain/dtos/user/profile/UserProfileEditRequestDTO";
import { UserProfileResponseDTO } from "../../../domain/dtos/user/profile/UserProfileResponseDTO";

/**
 * Defines user profile-related use cases in the application layer.
 * Each method represents a single business operation and remains 
 * independent of infrastructure concerns.
 */
export interface IUserProfileUseCase {
  /**
   *  Retrieves the user's profile data based on their ID.
   * @param userId - Unique Identifier of the user.
   * @returns A Promise that  resolves with the user's profile entity and return as userProfile response DTO.
   */
  getUserProfile(userId: string): Promise<UserProfileResponseDTO>;
  /**
   * Edits user profile data.
   * @param userId - Unique identifier of the user.
   * @param data - Partial user profile data to update.
   * @return  A promise that  resolves with the updated user profile entity
   */
  editProfileData(profileId: string, data: UserProfileEditRequestDTO): Promise<UserProfileResponseDTO>;
}