// import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
// import { BlankOrganizerProfileDTO } from "../../dtos/organizer/BlackOrganizerProfileDTO";
// import { OrganizerProfileDTO } from "../../dtos/organizer/OrganizerProfileDTO";
import { OrganizerProfile } from "../../entities/organizer/OrganizerProfile";
import { OrganizerProfileWithUser } from "../../types/OrganizerTypes";





export interface IOrganizerProfileRepository{
  createProfile(profileData: Partial<OrganizerProfile> ): Promise<OrganizerProfile>;
  getProfileWithUser(id:string): Promise< OrganizerProfileWithUser| null>;
  getOrganizerProfile(organizerId: string): Promise<OrganizerProfile>;
  updateProfile(id: string,  data: Partial< OrganizerProfile >): Promise<OrganizerProfile>;


}