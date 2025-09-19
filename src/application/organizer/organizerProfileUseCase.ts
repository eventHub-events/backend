import { OrganizerProfileDTO } from "../../domain/dtos/organizer/OrganizerProfileDTO";
import {  UpdatedOrganizerProfileFormResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileFormDTO";
import { OrganizerProfileResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { CustomError } from "../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { organizerProfileSchema } from "../../infrastructure/validaton/schemas/organizer/organizerProfileSchema";
import { IOrganizerProfileUseCase } from "../interface/organizer/IOrganizerProfileUseCase";
import { OrganizerProfileMapper } from "../mapper/organizer/OrganizerProfileMapper";

export class  OrganizerProfileUseCase implements IOrganizerProfileUseCase{
  constructor(private _organizerProfileRepo:IOrganizerProfileRepository, private  _userRepo : IUserRepository){}

  async registerOrganizerProfile(data: OrganizerProfileDTO): Promise<OrganizerProfileResponseDTO> {

      const profileData= await this._organizerProfileRepo.createProfile(data)
      return profileData
  }
  async updateOrganizerProfile(id:string,data: Partial<OrganizerProfileDTO>): Promise<UpdatedOrganizerProfileFormResponseDTO > {
  
       
   
     
     const validatedData = organizerProfileSchema.parse(data);
    


     const  dto   =    new OrganizerProfileDTO(validatedData)
     console.log("type of phone", typeof dto.phone)
     const  updateDetails =  OrganizerProfileMapper. toUpdateForm(dto)

         const{profileData,organizerBasicData} = updateDetails ;

      const  [updatedData,updatedBasicData] = await Promise.all([ this._organizerProfileRepo.updateProfile(id,profileData),  this._userRepo.updateUser(id,organizerBasicData)])

      if(!updatedData ||  !updatedBasicData) {
          throw new CustomError("Profile  update failed",HttpStatusCode.INTERNAL_SERVER_ERROR)
      }
       

      const finalData = OrganizerProfileMapper.toUpdateResponseForm(updatedData, updatedBasicData)

     
      return finalData
  }
  async organizerProfile(id: string): Promise<OrganizerProfileResponseDTO|null> {
      const profileData= await this._organizerProfileRepo.findByOrganizerId(id)
     
      return  profileData
  }


}