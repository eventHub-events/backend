import { UserProfileEntity } from "../../../../domain/entities/user/UserProfile";
import { UserProfileDbModel } from "../../../../domain/types/UserTypes";


/**
 * Factory interface responsible for creating a UserProfileEntity.
 */
export interface IUserProfileEntityFactory {
   /**
    * 
    * @param data  - The user profile document retrieved from  the database.
    * @returns A fully constructed UserProfileEntity ready  for domain use.
    */
   toDomainFromDbModel(data: UserProfileDbModel): UserProfileEntity;
}