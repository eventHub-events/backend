import { OrganizerProfileDTO } from "../../domain/dtos/organizer/OrganizerProfileDTO";
import {  UpdatedOrganizerProfileFormResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileFormDTO";
import { OrganizerProfileResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { IUserMinimal } from "../../domain/types/IUserMinimal";
import { IOrganizerProfile } from "../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { CustomError } from "../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { organizerProfileSchema } from "../../infrastructure/validaton/schemas/organizer/organizerProfileSchema";
import { IOrganizerProfileUseCase } from "../interface/organizer/IOrganizerProfileUseCase";
import { OrganizerProfileMapper } from "../mapper/organizer/OrganizerProfileMapper";

export class  OrganizerProfileUseCase implements IOrganizerProfileUseCase{
  constructor(private _organizerProfileRepo:IOrganizerProfileRepository, private  _userRepo : IUserRepository){}

  async registerOrganizerProfile(data: OrganizerProfileDTO): Promise<OrganizerProfileResponseDTO> {

      const profileData= await this._organizerProfileRepo.createProfile(data);
      return profileData
  }
  async updateOrganizerProfile(id:string,data: Partial<OrganizerProfileDTO>): Promise<UpdatedOrganizerProfileFormResponseDTO > {
  
       

     const validatedData = organizerProfileSchema.parse(data);
    


     const  dto   =    new OrganizerProfileDTO(validatedData);
   
     const  updateDetails =  OrganizerProfileMapper. toUpdateForm(dto);

         const{profileData,organizerBasicData} = updateDetails ;

      const  [updatedData,updatedBasicData] = await Promise.all([ this._organizerProfileRepo.updateProfile(id,profileData),  this._userRepo.updateUser(id,organizerBasicData)])

      if(!updatedData ||  !updatedBasicData) {
          throw new CustomError("Profile  update failed",HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
       

      const finalData = OrganizerProfileMapper.toUpdateResponseForm(updatedData, updatedBasicData) ;

     
      return finalData
  }
  async getOrganizerProfile(id: string): Promise<OrganizerProfileResponseDTO|null> {

      const profileData= await this._organizerProfileRepo.findByOrganizerId(id);
       return profileData ? OrganizerProfileMapper.toResponse( profileData as IOrganizerProfile & { organizerId: IUserMinimal }):null ;

     
      
  }


}