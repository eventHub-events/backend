import { OrganizerProfileDTO } from "../../domain/dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../domain/dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfileRepository } from "../../domain/repositories/organizer/IOrganizerProfileRepository";
import { IUserRepository } from "../../domain/repositories/user/IUserRepository";
import { IOrganizerProfileUseCase } from "../interface/organizer/IOrganizerProfileUseCase";
import { OrganizerProfileMapper } from "../mapper/organizer/OrganizerProfileMapper";

export class  OrganizerProfileUseCase implements IOrganizerProfileUseCase{
  constructor(private _organizerProfileRepo:IOrganizerProfileRepository){}

  async registerOrganizerProfile(data: OrganizerProfileDTO): Promise<OrganizerProfileResponseDTO> {

      const profileData= await this._organizerProfileRepo.createProfile(data)
      return profileData
  }
  async updateOrganizerProfile(id:string,data: Partial<OrganizerProfileDTO>): Promise<OrganizerProfileResponseDTO> {
    
      const updatedData= await this._organizerProfileRepo.updateProfile(id,data)
      return updatedData
  }
  async organizerProfile(id: string): Promise<OrganizerProfileResponseDTO|null> {
      const profileData= await this._organizerProfileRepo.findByOrganizerId(id)
     
      return  profileData
  }


}