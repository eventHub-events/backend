
import { IUserProfileEntityFactory } from "../../../application/interface/factories/user/IUserProfileEntityfactory";
import { UserProfileEntity } from "../../../domain/entities/user/UserProfile";
import { UserProfileDbModel } from "../../../domain/types/UserTypes";



/**
 * Concrete implementation of the IUserProfileEntityFactory interface.
 * Responsible for converting a infrastructure layer UserProfile document
 * into a domain-layer UserProfileEntity.
 */
export class UserProfileEntityFactory implements IUserProfileEntityFactory {
  /**
   * Maps a database UserProfile document into a pure domain entity.
   * @param data - the user profile document fetched from the database.
   * @returns A domain-level UserProfileEntity instance containing only business-relevant data.
   */
   toDomainFromDbModel(data: UserProfileDbModel): UserProfileEntity {
       return new UserProfileEntity(
           data.name,
           data.address,
           data.memberSince,
           data.image,
           data.twoFAEnabled,
           data.favorites,
           data._id?.toString(),
           data.user.toString()


       )
   }
}