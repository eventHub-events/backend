import { OrganizerVerificationResponseDTO } from "../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { HandleErrorUtility } from "../../utils/HandleErrorUtility";
import { IOrganizerVerificationUseCase } from "../interface/admin/IOrganizerVerificationUseCase";

export class OrganizerVerificationUseCase implements IOrganizerVerificationUseCase{
  constructor(
    private _organizerProfileRepo:IOrganizerProfileRepository,
    private  _uploadDocumentRepo:IUploadDocumentRepository
  ){}

  async getOrganizerVerificationDetails(organizerId: string): Promise<OrganizerVerificationResponseDTO> {
      try{
        const organizerProfile=await this._organizerProfileRepo.findByOrganizerId(organizerId);
        const organizerDocs= await this._uploadDocumentRepo.findByOrganizerId(organizerId)
        if(!organizerProfile||!organizerDocs)throw new Error("Organizer profile or  organizerDocs is missing")
       return {
        organizerId: organizerProfile.organizerId,
        location: organizerProfile.location,
        organization: organizerProfile.organization,
        bio: organizerProfile.bio,
        website: organizerProfile.website,
        trustScore: organizerProfile.trustScore,
        totalEarnings: organizerProfile.totalEarnings,
        kycVerified: organizerProfile.kycVerified,
        profilePicture: organizerProfile.profilePicture,
        documents: organizerDocs,
      };
      }catch(error:unknown){
        const err= HandleErrorUtility.handleError(error)
        throw err
        

      }
  }

}