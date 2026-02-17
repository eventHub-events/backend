import { OrganizerProfileDTO } from '../../DTOs/organizer/OrganizerProfileDTO';
// import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { OrganizerProfileResponseDTO } from '../../DTOs/organizer/OrganizerProfileResponseDTO';
// import { IUserMinimal } from "../../../domain/types/IUserMinimal";
import { UpdatedOrganizerProfileFormResponseDTO } from '../../DTOs/organizer/OrganizerProfileFormDTO';
// import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { OrganizerProfile } from '../../../domain/entities/organizer/OrganizerProfile';
import { UserEntity } from '../../../domain/entities/User';

export class OrganizerProfileMapper {
  static toDomainForUpdate(
    profileData: OrganizerProfileDTO
  ): Partial<OrganizerProfile> {
    return {
      location: profileData.location || '',
      organization: profileData.organization || '',
      website: profileData.website || '',
      profilePicture: profileData.profilePicture || '',
      bio: profileData.bio || '',
      //  kycVerified: profileData.kycVerified ?? false,
      totalEarnings: profileData.totalEarnings ?? 0,
      trustScore: profileData.trustScore ?? 0,
    };
  }
  static toDomain(profileData: OrganizerProfileDTO): OrganizerProfile {
    return new OrganizerProfile(
      profileData.location || '',
      profileData.organization || '',
      profileData.website || '',
      profileData.profilePicture || '',
      profileData.bio || '',
      profileData.totalEarnings ?? 0,
      profileData.trustScore ?? 0,
      profileData.organizerId,
      false
    );
  }

  static toResponse(
    profile: OrganizerProfile,
    user: UserEntity
  ): OrganizerProfileResponseDTO {
    return {
      organizerId: {
        _id: user.id!,
        name: user.name,
        email: user.email,
        phone: user.phone!,
        isVerified: user.isVerified,
        kycStatus: user.kycStatus!,
        role: user.role,
        isKycResubmitted: user.isKycResubmitted,
        isProfileCompleted: user.isProfileCompleted,
          isKycSubmitted: user.isKycSubmitted,
          isStripeConnected: user.isStripeConnected,
          isSubscribed: user.isSubscribed,
          hasPassword:user.hasPassword
      },
      location: profile.location,
      organization: profile.organization,
      website: profile.website,
      profilePicture: profile.profilePicture,
      bio: profile.bio,
      kycVerified: profile.kycVerified,
      trustScore: profile.trustScore,
      totalEarnings: profile.totalEarnings,
    };
  }
  static toUpdateForm(profile: OrganizerProfileDTO): {
    profileData: Partial<OrganizerProfile>;
    organizerBasicData: Partial<UserEntity>;
  } {
    const profileData = {
      location: profile.location,
      organization: profile.organization,
      website: profile.website,
      profilePicture: profile.profilePicture,
      bio: profile.bio,
      trustScore: profile.trustScore,
      totalEarnings: profile.totalEarnings,
    } as Partial<OrganizerProfile>;
    const organizerBasicData = {
      name: profile.name,
      email: profile.email,
      phone: Number(profile.phone),
      isProfileCompleted:true
    } as Partial<UserEntity>;

    return { profileData, organizerBasicData };
  }
  static toUpdateResponseForm(
    updatedProfileData: OrganizerProfile,
    updatedBasicData: UserEntity
  ): UpdatedOrganizerProfileFormResponseDTO {
    return {
      name: updatedBasicData.name,
      email: updatedBasicData.email,
      phone: updatedBasicData.phone!.toString(),
      id: updatedBasicData?.id,
      role: updatedBasicData.role!,
      isBlocked: updatedBasicData.isBlocked!,
      isVerified: updatedBasicData.isVerified,
      location: updatedProfileData.location,
      organization: updatedProfileData.organization,
      website: updatedProfileData.website,
      profilePicture: updatedProfileData.profilePicture,
      bio: updatedProfileData.bio,
      trustScore: updatedProfileData.trustScore,
      totalEarnings: updatedProfileData.totalEarnings,
      organizerId: updatedBasicData.id,
      isProfileCompleted:updatedBasicData.isProfileCompleted,
      isKycSubmitted: updatedBasicData.isKycSubmitted,
      isSubscribed: updatedBasicData.isSubscribed,
      isStripeConnected:updatedBasicData.isStripeConnected
    };
  }
}
