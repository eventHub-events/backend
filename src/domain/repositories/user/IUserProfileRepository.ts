import { UserProfileEntity } from "../../entities/user/UserProfile";


/**
 * Repository interface  for user profile data access and persistence.
 * Follows the dependency inversion  principle of SOLID.
 */
export interface IUserProfileRepository {
/**
 * 
 * @param profileData - The Updated profile entity  data.
 * @param profileId - It represents the unique profile Id.
 * @returns A promise that resolves with updated UserProfileEntity.
 */
  updateProfile(profileId: string, profileData: Partial<UserProfileEntity>): Promise<UserProfileEntity>;
  /**
   * 
   * @param userId  - The ID of the user whose profile is to be fetched.
   * @returns  A promise that  resolves with the UserProfileEntity.
   */
  fetchProfile(userId:string): Promise<UserProfileEntity>;
  createProfile(data: UserProfileEntity): Promise<void>;
}