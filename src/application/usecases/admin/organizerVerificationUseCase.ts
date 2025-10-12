import { UpdateOrganizerOverallVerificationStatusDTO } from "../../../domain/dtos/admin/OrganizerOverallVerificationDTO";
import { OrganizerVerificationResponseDTO } from "../../../domain/dtos/admin/OrganizerVerificationResponseDTO";
import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentUpdateDTO } from "../../../domain/dtos/admin/UploadDocumentUpdationDTO";
import { CompleteOrganizerDetailResponseDTO } from "../../../domain/dtos/admin/UserWithOrganizerProfileDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { UserRole } from "../../../domain/enums/user/userRoles";
import { IOrganizerProfileRepository } from "../../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUploadDocumentRepository } from "../../../domain/repositories/organizer/IUploadDocumentRepository";
import { IUserQueryRepository } from "../../../domain/repositories/user/IUserQueryRepository";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { KycStatus } from "../../../infrastructure/db/models/user/UserModel";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { IOrganizerVerificationMapper } from "../../interface/admin/IOrganizerVerificationMapper";
import { IOrganizerVerificationUseCase } from "../../interface/admin/IOrganizerVerificationUseCase";


export class OrganizerVerificationUseCase implements IOrganizerVerificationUseCase{
  constructor(
    private _organizerProfileRepo:IOrganizerProfileRepository,
    private  _uploadDocumentRepo:IUploadDocumentRepository,
    private _userRepository :IUserRepository,
    private _userQueryRepo:IUserQueryRepository,
    private _verificationMapper: IOrganizerVerificationMapper
  ){}

  async getOrganizerVerificationDetails(organizerId: string): Promise<OrganizerVerificationResponseDTO> {

      try{
        console.log("hello  from  get")
        const   organizerDetails = await this._organizerProfileRepo.getProfileWithUser(organizerId);

        const organizerDocs= await this._uploadDocumentRepo.findDocuments(organizerId);

        if(!organizerDetails || !organizerDocs) throw new Error("Organizer profile or  organizerDocs is missing");

        const{profile, user}  = organizerDetails;
        console.log("organizer Verification  details is",organizerDetails)
        
         const result =  this._verificationMapper.toResponse(profile, user, organizerDocs);
         console.log(result)
         return result;
      
      }catch(error:unknown){
        const err= HandleErrorUtility.handleError(error)
        throw err
        

      }
  }
  async getPendingOrganizers():Promise<{ users: Omit<UserResponseDTO, "phone" | "password">[] } >{
       try{
        const pendingOrganizer= await this._userRepository.findAllWithFilter({role: UserRole.ORGANIZER, kycStatus: KycStatus.Pending});
        if(!pendingOrganizer) throw new Error("Pending organizers doesn't  exist");
        return pendingOrganizer
         
        


       }catch(error:unknown){
        const err = HandleErrorUtility.handleError(error);
        throw err;
        
       }
      
  }
  async getPendingOrganizersWithProfile(): Promise<CompleteOrganizerDetailResponseDTO[]> {
   
      try{
        const organizerDetails = await this._userQueryRepo.findPendingOrganizersWithProfile()
       
        const  result = this._verificationMapper.toOrganizerDetailsResponse(organizerDetails);
        
        return result

      }catch(err:unknown){
        const error=HandleErrorUtility.handleError(err);
        throw  new Error(error)

      }
  }

  async updateDocumentStatus(organizerId: string, data: UploadDocumentUpdateDTO): Promise<UpdatedUploadDocumentResponseDTO> {
    try{
          const updateDoc  = this._verificationMapper.toDomainForUploadDocumentStatus(data)
         const updatedDoc = await this._uploadDocumentRepo.updateDocument(organizerId,updateDoc);
         return this._verificationMapper.toResponseAfterUpdate(updatedDoc);

    }catch(err:unknown){
       const error=HandleErrorUtility.handleError(err);
        throw  new Error(error)

    }
      
  }
  async  updateOverallVerificationStatus(organizerId: string, data: UpdateOrganizerOverallVerificationStatusDTO): Promise<string> {
    try{
         const{user,profile}=data;
      await Promise.all([this._userRepository.updateUser(organizerId,user),this._organizerProfileRepo.updateProfile(organizerId,profile)])   
     return "Organizer overall status updated successfully" ;

    }catch(error){
       const err=HandleErrorUtility.handleError(error);
        throw  new Error(err)
    }
    
  }

}