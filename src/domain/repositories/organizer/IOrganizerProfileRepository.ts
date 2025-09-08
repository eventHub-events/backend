import { OrganizerProfileDTO } from "../../dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizerProfile } from "../../entities/organizer/IOrganizerProfile";


export interface IOrganizerProfileRepository{
  createProfile(profileData:OrganizerProfileDTO):Promise<OrganizerProfileResponseDTO>
  findByOrganizerId(id:string):Promise<OrganizerProfileResponseDTO| null>
  updateProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<OrganizerProfileResponseDTO>;

}