import { ILoggerService } from '../../../application/interface/common/ILoggerService';
import { IOrganizerProfileEntityFactory } from '../../../application/interface/factories/IDomainFactory';
import { ErrorMessages } from '../../../constants/errorMessages';
import { OrganizerProfile } from '../../../domain/entities/organizer/OrganizerProfile';

import { IOrganizerProfileRepository } from '../../../domain/repositories/organizer/IOrganizerProfileRepository';
import {
  OrganizerProfileDbModel,
  OrganizerProfileWithUser,
} from '../../../domain/types/OrganizerTypes';
import { UserDbModel } from '../../../domain/types/UserTypes';
import OrganizerProfileModel, {
  IOrganizerProfile,
} from '../../db/models/organizer/profile/OrganizerProfile';

import { CustomError } from '../../errors/errorClass';
import { HttpStatusCode } from '../../interface/enums/HttpStatusCode';
import { BaseRepository } from './../BaseRepository';

export class OrganizerProfileRepository
  extends BaseRepository<IOrganizerProfile>
  implements IOrganizerProfileRepository
{
  constructor(
    private _logger: ILoggerService,
    private _organizerProfileEntityFactory: IOrganizerProfileEntityFactory<
      OrganizerProfileDbModel,
      OrganizerProfile,
      UserDbModel,
      OrganizerProfileWithUser
    >
  ) {
    super(OrganizerProfileModel);
  }
  async createProfile(
    profileData: OrganizerProfile
  ): Promise<OrganizerProfile> {
    this._logger.info(
      `Creating Organizer profile for id:${profileData.organizerId}`
    );

    const profileDoc = (await super.create(
      this._organizerProfileEntityFactory.toPersistence(profileData)
    )) as OrganizerProfileDbModel;
    return this._organizerProfileEntityFactory.toDomain(profileDoc);
  }
  async getProfileWithUser(
    id: string
  ): Promise<OrganizerProfileWithUser | null> {
    this._logger.info(`Finding the Organizer Profile with Id:${id}`);

    const profileDoc = await super.findOneWithPopulate({ organizerId: id }, [
      'organizerId',
    ]);

    const doc = profileDoc as OrganizerProfileDbModel & {
      organizerId: UserDbModel;
    };
    if (!profileDoc) {
      throw new CustomError(ErrorMessages.PROFILE.NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }
    
    return this._organizerProfileEntityFactory.toCompositeDomain(doc);
  }
  async getOrganizerProfile(organizerId: string): Promise<OrganizerProfile> {
    this._logger.info(`Finding the organizer profile with Id: ${organizerId}`);

    const profileDoc = (await super.findOne({
      organizerId,
    })) as OrganizerProfileDbModel;
    return this._organizerProfileEntityFactory.toDomain(profileDoc);
  }
  async updateProfile(
    id: string,
    data: Partial<OrganizerProfile>
  ): Promise<OrganizerProfile> {
    this._logger.info(`Updating Organizer Profile with id:${id}`);
    const updated = (await super.findOneAndUpdate(
      { organizerId: id },
      data
    )) as OrganizerProfileDbModel;

    if (!updated) {
      this._logger.error(`No profile found with organizerId:${id}`);
      throw new CustomError(ErrorMessages.PROFILE.NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }

    return this._organizerProfileEntityFactory.toDomain(updated);
  }
}
