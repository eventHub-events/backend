import { Types } from "mongoose";
import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { User } from "../../../domain/entities/User";
import { IUserMinimal } from "../../../domain/types/IUserMinimal";

export class OrganizerProfileMapper{
static toDomain(profileData:OrganizerProfileDTO):IOrganizerProfile{
 return {
  organizerId:new Types.ObjectId(profileData.organizerId),
  location:profileData.location ||"" ,
  organization:profileData.organization ||"",
  website:profileData.website ||"",
  profilePicture:profileData.profilePicture ||"",
  bio:profileData.bio||"",
    kycVerified: profileData.kycVerified ?? false,
      trustScore: profileData.trustScore ?? 0,
      totalEarnings: profileData.totalEarnings ?? 0,

 } as IOrganizerProfile
}
 static toResponse(profile:IOrganizerProfile& {organizerId:IUserMinimal}):OrganizerProfileResponseDTO{
  return{
organizerId: {
        _id: profile.organizerId._id.toString(),
        name: profile.organizerId.name,
        email: profile.organizerId.email,
        phone: profile.organizerId.phone,
        isVerified:profile.organizerId.isVerified,
        kycStatus:profile.organizerId.kycStatus
       
       
      },
  location :profile.location,
  organization:profile.organization,
  website:profile.website,
  profilePicture:profile.profilePicture,
  bio:profile.bio,
  kycVerified:profile.kycVerified,
  trustScore:profile.trustScore,
  totalEarnings:profile.totalEarnings,
 


  }


 }

}