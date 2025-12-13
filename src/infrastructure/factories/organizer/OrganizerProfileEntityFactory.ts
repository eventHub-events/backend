import { Types } from 'mongoose';
import { UserDbModel } from '../../../domain/types/UserTypes';
import {
  OrganizerProfileDbModel,
  OrganizerProfileWithUser,
} from '../../../domain/types/OrganizerTypes';
import { UserEntity } from '../../../domain/entities/User';
import { OrganizerProfile } from '../../../domain/entities/organizer/OrganizerProfile';
import { IOrganizerProfileEntityFactory } from '../../../application/interface/factories/IDomainFactory';

export class OrganizerProfileEntityFactory implements IOrganizerProfileEntityFactory<
  OrganizerProfileDbModel,
  OrganizerProfile,
  UserDbModel,
  OrganizerProfileWithUser
> {
  toDomain(dbModel: OrganizerProfileDbModel): OrganizerProfile {
    return new OrganizerProfile(
      dbModel.location,
      dbModel.organization,
      dbModel.website,
      dbModel.profilePicture,
      dbModel.bio,
      dbModel.totalEarnings,
      dbModel.trustScore,
      typeof dbModel.organizerId === 'string'
        ? dbModel.organizerId
        : dbModel.organizerId._id.toString(),
      dbModel.kycVerified
    );
  }
  toDomainList(dbModels: OrganizerProfileDbModel[]): OrganizerProfile[] {
    return dbModels.map(model => this.toDomain(model));
  }
  toCompositeDomain(
    dbModel: OrganizerProfileDbModel & { organizerId: UserDbModel }
  ): OrganizerProfileWithUser {
    const profile = new OrganizerProfile(
      dbModel.location,
      dbModel.organization,
      dbModel.website,
      dbModel.profilePicture,
      dbModel.bio,
      dbModel.totalEarnings,
      dbModel.trustScore,
      typeof dbModel.organizerId === 'string'
        ? dbModel.organizerId
        : dbModel.organizerId._id.toString(),
      dbModel.kycVerified
    );
    const user = new UserEntity({
      name: dbModel.organizerId.name,
      email: dbModel.organizerId.email,
      password: dbModel.organizerId.password,
      phone: dbModel.organizerId.phone,
      isVerified: dbModel.organizerId.isVerified,
      role: dbModel.organizerId.role,
      kycStatus: dbModel.organizerId.kycStatus,
      isBlocked: dbModel.organizerId.isBlocked,
      isKycResubmitted: dbModel.organizerId.isKycResubmitted,
      id: dbModel.organizerId._id?.toString(),
      createdAt: dbModel.organizerId.createdAt,
    });
    return { profile, user };
  }
  toPersistence(entity: OrganizerProfile): Record<string, unknown> {
    return {
      location: entity.location,
      organization: entity.organization,
      website: entity.website,
      profilePicture: entity.profilePicture,
      bio: entity.bio,
      totalEarnings: entity.totalEarnings,
      trustScore: entity.trustScore,
      organizerId: new Types.ObjectId(entity.organizerId),
      kycVerified: entity.kycVerified,
    };
  }
}
