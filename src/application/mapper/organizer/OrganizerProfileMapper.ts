import { Types } from "mongoose";
import { OrganizerProfileDTO } from "../../../domain/dtos/organizer/OrganizerProfileDTO";
import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { OrganizerProfileResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IUserMinimal } from "../../../domain/types/IUserMinimal";
import { OrganizerProfileFormDTO, UpdatedOrganizerProfileFormResponseDTO } from "../../../domain/dtos/organizer/OrganizerProfileFormDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";

export class OrganizerProfileMapper{
static toDomain(profileData:OrganizerProfileDTO):IOrganizerProfile{
 return {
  organizerId:new Types.ObjectId(profileData.organizerId),
  location:profileData.location ||"" ,
  organization:profileData.organization ||"",
  website:profileData.website ||"",
  profilePicture:profileData.profilePicture ||"",
  bio:profileData.bio||"",
    // kycVerified: profileData.kycVerified ?? false,
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
 static toUpdateForm(profile:OrganizerProfileDTO): OrganizerProfileFormDTO{
  const profileData = {
          location :profile.location,
  organization:profile.organization,
  website:profile.website,
  profilePicture:profile.profilePicture,
  bio:profile.bio,
  trustScore:profile.trustScore,
  totalEarnings:profile.totalEarnings,
 
  }
  const organizerBasicData = {
       name: profile.name,
        email: profile.email,
        phone: Number(profile.phone),
  }

  return {profileData ,organizerBasicData}
 }
static  toUpdateResponseForm( updatedProfileData: IOrganizerProfile,updatedBasicData: UserResponseDTO ) : UpdatedOrganizerProfileFormResponseDTO{
    
  return {
    name :updatedBasicData.name ,
    email : updatedBasicData. email,
    phone : updatedBasicData.phone.toString() ,
     location :updatedProfileData.location,
  organization:updatedProfileData.organization,
  website:updatedProfileData.website,
  profilePicture:updatedProfileData.profilePicture,
  bio:updatedProfileData.bio,
  trustScore:updatedProfileData.trustScore,
  totalEarnings: updatedProfileData.totalEarnings,
  organizerId:updatedBasicData.id


  }
}
}