import { Types } from "mongoose";
import { IUserProfileEntityFactory } from "../../../../application/interface/factories/user/IUserProfileEntityfactory";
import { UserProfileEntity } from "../../../../domain/entities/user/UserProfile";
import { IUserProfileRepository } from "../../../../domain/repositories/user/IUserProfileRepository";
import { UserProfileDbModel } from "../../../../domain/types/UserTypes";
import UserProfileModel, { IUserProfileDocument } from "../../../db/models/user/UserProfile";
import { BaseRepository } from "../../BaseRepository";
import { DataFetchError, UpdateFailedError } from "../../../../domain/errors/userProfile";

/**
 * @class UserProfileRepository
 * @implements {IUserProfileRepository}
 * 
 * @description 
 * Concrete implementation of the IUserProfileRepository interface.
 * It extends the  BaseRepository to inherit common CRUDlogic and converts raw database models
 * into domain entities using the Injected UserProfileEntityFactory.
 */

export class UserProfileRepository extends BaseRepository<IUserProfileDocument> implements IUserProfileRepository {

  /**
   * @constructor
   * @param _profileEntityFactory  - responsible for mapping DB models into  domain entities.
   */
  constructor(
         private _profileEntityFactory: IUserProfileEntityFactory
  ){
    super(UserProfileModel)
  }
  async createProfile(data: UserProfileEntity): Promise<void> {
    const doc = {
      ...data,
      user: new Types.ObjectId(data.user)
    }
      const result = await super.create(doc)as UserProfileDbModel
      if(!result) throw new Error("User profile creation  failed");

  }
 async  updateProfile(profileId: string, profileData: Partial<UserProfileEntity>): Promise<UserProfileEntity> {

     const updatedData  = await super.update(profileId,profileData) as UserProfileDbModel;
     if(!updatedData) throw new UpdateFailedError("User profile update failed")
     return this._profileEntityFactory.toDomainFromDbModel(updatedData)
      
  }
  async fetchProfile(userId: string): Promise<UserProfileEntity> {

    const result = await super.findOne({user:userId}) as UserProfileDbModel;
    if(!result) throw new DataFetchError("Error in  fetching user profile document")

   return this._profileEntityFactory.toDomainFromDbModel(result) 
      
  }
}
