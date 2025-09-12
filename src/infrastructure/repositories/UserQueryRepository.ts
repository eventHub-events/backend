import { UserWithOrganizerProfileDTO } from "../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { IUserQueryRepository } from "../../domain/repositories/user/IUserQueryRepository";
import UserModel from "../db/models/UserModel";

export class UserQueryRepository implements IUserQueryRepository {
  async findPendingOrganizersWithProfile(): Promise<UserWithOrganizerProfileDTO[]> {
    try {
      return UserModel.aggregate([
        {
          $match: {
            role: "organizer",
            kycStatus: "Pending",
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
            id: 1,
            name: 1,
            email: 1,
            role: 1,
            kycStatus: 1,
            createdAt: 1,
            organizerProfile: {
              organization: "$organizerProfile.organization",
              bio: "$organizerProfile.bio",
              location: "$organizerProfile.location",
              website: "$organizerProfile.website",
              trustScore: "$organizerProfile.trustScore",
              totalEarnings: "$organizerProfile.totalEarnings",
              profilePicture: "$organizerProfile.profilePicture",
            },
          },
        },
      ]);
    } catch (err) {
      throw new Error("Database error: failed to fetch pending organizers");
    }
  }
}
