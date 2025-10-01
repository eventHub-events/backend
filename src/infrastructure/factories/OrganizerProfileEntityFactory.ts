import { Types } from "mongoose";
import {  IOrganizerProfileEntityFactory } from "../../application/interface/factories/IDomainFactory";
import { OrganizerProfile } from "../../domain/entities/organizer/OrganizerProfile";
import { User } from "../../domain/entities/User";
import { OrganizerProfileDbModel, OrganizerProfileWithUser } from "../../domain/types/OrganizerTypes";
import { UserDbModel } from "../../domain/types/UserTypes";

export class OrganizerProfileEntityFactory implements IOrganizerProfileEntityFactory< OrganizerProfileDbModel, OrganizerProfile, UserDbModel, OrganizerProfileWithUser> {

toDomain(dbModel: OrganizerProfileDbModel): OrganizerProfile {
    return new OrganizerProfile(
      dbModel.location,
      dbModel.organization,
      dbModel.website,
      dbModel.profilePicture,
      dbModel.bio,
      dbModel.totalEarnings,
      dbModel.trustScore,
       typeof dbModel.organizerId === "string"?dbModel.organizerId:dbModel.organizerId._id.toString(),
      dbModel.kycVerified

    )
}
toDomainList(dbModels: OrganizerProfileDbModel[]): OrganizerProfile[] {
    return  dbModels.map((model) => this.toDomain(model));
}
toCompositeDomain(dbModel: OrganizerProfileDbModel & { organizerId: User}): OrganizerProfileWithUser{
    const profile = new OrganizerProfile(
      dbModel.location,
      dbModel.organization,
      dbModel.website,
      dbModel.profilePicture,
      dbModel.bio,
      dbModel.totalEarnings,
      dbModel.trustScore,
       typeof dbModel.organizerId === "string"?dbModel.organizerId:dbModel.organizerId._id.toString(),
      dbModel.kycVerified
    );
    const user = new User (
      dbModel.organizerId.name,
      dbModel.organizerId.email,
      dbModel.organizerId.password,
      dbModel.organizerId.phone,
      dbModel.organizerId.isVerified,
      dbModel.organizerId.role,
      dbModel.organizerId.kycStatus,
      dbModel.organizerId.isBlocked,
      dbModel.organizerId.isKycResubmitted,
      dbModel.organizerId._id?.toString(),
      dbModel.organizerId.createdAt,
    )
    return {profile,user}
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
      kycVerified: entity.kycVerified
    };
    
}

}