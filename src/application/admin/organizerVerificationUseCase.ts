import { UpdateOrganizerOverallVerificationStatusDTO } from "../../domain/dtos/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../domain/dtos/admin/UploadDocumentUpdationDTO";
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

  async updateDocumentStatus(organizerId: string, data: UploadDocumentUpdateDTO): Promise<UpdatedUploadDocumentResponseDTO> {
    try{
      return this._uploadDocumentRepo.findAndUpdate(organizerId,data)

    }catch(err:unknown){
       const error=HandleErrorUtility.handleError(err);
        throw  new Error(error)

    }
      
  }
  async  updateOverallVerificationStatus(organizerId: string, data: UpdateOrganizerOverallVerificationStatusDTO): Promise<string> {
    try{
         const{user,profile}=data;
     const result= await Promise.all([this._userRepository.updateUser(organizerId,user),this._organizerProfileRepo.updateProfile(organizerId,profile)])   
     return "Organizer overall status updated successfully"  
    }catch(error){
       const err=HandleErrorUtility.handleError(error);
        throw  new Error(err)
    }
    
  }

}