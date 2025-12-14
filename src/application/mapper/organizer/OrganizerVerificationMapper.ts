import { UpdateOrganizerOverallVerificationStatusDTO } from '../../DTOs/admin/OrganizerOverallVerificationDTO';
import { OrganizerVerificationResponseDTO } from '../../DTOs/admin/OrganizerVerificationResponseDTO';
import { UpdatedUploadDocumentResponseDTO } from '../../DTOs/admin/UpdatedUploadedDocumentDTO';
import { UploadDocumentUpdateDTO } from '../../DTOs/admin/UploadDocumentUpdateDTO';
import { CompleteOrganizerDetailResponseDTO } from '../../DTOs/admin/UserWithOrganizerProfileDTO';
import { KycStatus } from '../../../infrastructure/db/models/user/UserModel';
import { UploadDocument } from '../../../domain/entities/organizer/Document';
import { OrganizerProfile } from '../../../domain/entities/organizer/OrganizerProfile';
import { UserEntity } from '../../../domain/entities/User';
import { OrganizerProfileWithUser } from '../../../domain/types/OrganizerTypes';
import { IOrganizerVerificationMapper } from '../../interface/useCases/admin/IOrganizerVerificationMapper';

export class OrganizerVerificationMapper implements IOrganizerVerificationMapper {
  toResponse(
    profile: OrganizerProfile,
    user: UserEntity,
    Docs: UploadDocument[]
  ): OrganizerVerificationResponseDTO {
    const mappedDocs = Docs.map(doc => {
      return {
        id: doc.id,
        name: doc.fileName,
        type: doc.type,
        cloudinaryPublicId: doc.cloudinaryPublicId,
        uploadedAt: doc.uploadedAt,
        status: doc.status,
        verified: doc.verified,
      };
    });

    return {
      organizerId: user,
      location: profile.location,
      organization: profile.organization,
      bio: profile.website,
      website: profile.website,
      trustScore: profile.trustScore,
      totalEarnings: profile.totalEarnings,
      kycVerified: profile.kycVerified,
      profilePicture: profile.profilePicture,
      documents: mappedDocs,
    };
  }

  toOrganizerDetailsResponse(
    organizerData: OrganizerProfileWithUser[]
  ): CompleteOrganizerDetailResponseDTO[] {
    return organizerData.map(organizer => {
      const organizerProfileDetails = {
        organization: organizer.profile.organization,
        bio: organizer.profile.bio,
        location: organizer.profile.location,
        website: organizer.profile.website,
        trustScore: organizer.profile.trustScore,
        totalEarnings: organizer.profile.totalEarnings,
        profilePicture: organizer.profile.profilePicture,
        organizerId: organizer.profile.organizerId?.toString(),
      };
      return {
        id: organizer.user.id,
        name: organizer.user.name,
        email: organizer.user.email,
        role: organizer.user.role || '',
        kycStatus: organizer.user.kycStatus || KycStatus.NotApplicable,
        createdAt: organizer.user.createdAt,
        organizerProfile: organizerProfileDetails,
      };
    });
  }
  toResponseAfterUpdate(
    documentData: UploadDocument
  ): UpdatedUploadDocumentResponseDTO {
    return {
      organizerId: documentData.organizerId,
      name: documentData.fileName,
      type: documentData.type,
      cloudinaryPublicId: documentData.cloudinaryPublicId,
      uploadedAt: documentData.uploadedAt,
      status: documentData.status,
      verified: documentData.verified,
      reviewedBy: documentData.reviewedBy,
      reviewedAt: documentData.reviewedAt,
      reason: documentData.reason,
    };
  }
  toDomainForOverallVerification(
    data: UpdateOrganizerOverallVerificationStatusDTO
  ): { user: Partial<UserEntity>; profile: Partial<OrganizerProfile> } {
    const { user, profile } = data;
    return {
      user,
      profile,
    };
  }
  toDomainForUploadDocumentStatus(
    documentData: UploadDocumentUpdateDTO
  ): Partial<UploadDocument> {
    return documentData;
  }
}
