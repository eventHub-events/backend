import { OrganizerVerificationResponseDTO } from "../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UserWithOrganizerProfileDTO } from "../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { IUserQueryRepository } from "../../domain/repositories/user/IUserQueryRepository";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { HandleErrorUtility } from "../../utils/HandleErrorUtility";
import { IOrganizerVerificationUseCase } from "../interface/admin/IOrganizerVerificationUseCase";

export class OrganizerVerificationUseCase implements IOrganizerVerificationUseCase{
  constructor(
    private _organizerProfileRepo:IOrganizerProfileRepository,
    private  _uploadDocumentRepo:IUploadDocumentRepository,
    private _userRepository :IUserRepository,
    private _userQueryRepo:IUserQueryRepository
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
  async getPendingOrganizers():Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >{
       try{
        const pendingOrganizer= await this._userRepository.findAllWithFilter({role:"organizer",kycStatus:"Pending"})
        if(!pendingOrganizer) throw new Error("Pending organizers doesn't  exist");
        return pendingOrganizer
         
        


       }catch(error:unknown){
        const err = HandleErrorUtility.handleError(error);
        throw err;
        
       }
      
  }
  async getPendingOrganizersWithProfile(): Promise<UserWithOrganizerProfileDTO[]> {
      try{
        return this._userQueryRepo.findPendingOrganizersWithProfile()

      }catch(err:unknown){
        const error=HandleErrorUtility.handleError(err);
        throw  new Error(error)

      }
  }

}