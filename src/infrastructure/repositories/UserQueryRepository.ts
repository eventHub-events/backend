
import { UserRole } from "../../domain/enums/user/userRoles";
import { IUserQueryRepository } from "../../domain/repositories/user/IUserQueryRepository";
import { OrganizerProfileWithUser } from "../../domain/types/OrganizerTypes";
import UserModel, { KycStatus } from "../db/models/UserModel";

export class UserQueryRepository implements IUserQueryRepository {
  async findPendingOrganizersWithProfile(): Promise< OrganizerProfileWithUser[]> {
    try {
    return UserModel.aggregate([
  {
    $match: {
      role: UserRole.ORGANIZER,
      kycStatus: KycStatus.Pending,
    },
  },
  {
    $lookup: {
      from: "organizerprofiles",
      localField: "_id",
      foreignField: "organizerId",
      as: "organizerProfile",
    },
  },
  {
    $unwind: {
      path: "$organizerProfile",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      id: { $toString: "$_id" }, 
    },
  },
  {
    $project: {
      user: {
        id: "$id",
        name: "$name",
        email: "$email",
        role: "$role",
        kycStatus: "$kycStatus",
        createdAt: "$createdAt"
      },
      profile: {
        organization: "$organizerProfile.organization",
        bio: "$organizerProfile.bio",
        location: "$organizerProfile.location",
        website: "$organizerProfile.website",
        trustScore: "$organizerProfile.trustScore",
        totalEarnings: "$organizerProfile.totalEarnings",
        profilePicture: "$organizerProfile.profilePicture",
        organizerId   : "$organizerProfile.organizerId"
      }
    }
  }
]);

    } catch (err) {
      throw new Error("Database error: failed to fetch pending organizers");
    }
  }
}
