import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { IUserDocument } from "../../../infrastructure/db/models/UserModel";
import { BlankOrganizerProfileDTO } from "../../dtos/organizer/BlackOrganizerProfileDTO";
import { OrganizerProfileDTO } from "../../dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfileResponseDTO } from "../../dtos/organizer/OrganizerProfileResponseDTO";
import { IOrganizer } from "../../entities/IOrganizer";





export interface IOrganizerProfileRepository{
  createProfile(profileData:OrganizerProfileDTO |BlankOrganizerProfileDTO ):Promise<OrganizerProfileResponseDTO>
  findByOrganizerId(id:string):Promise<(IOrganizerProfile & {organizerId :IUserDocument})| null>
  updateProfile(id:string,data: Partial<OrganizerProfileDTO>):Promise<IOrganizerProfile>;
  // updateProfile(id:string,data:Partial<OrganizerProfileDTO>):Promise<OrganizerProfileResponseDTO>;

}