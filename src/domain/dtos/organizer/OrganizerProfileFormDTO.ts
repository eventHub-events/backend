import { IOrganizerProfile } from "../../../infrastructure/db/models/organizer/profile/OrganizerProfile";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { UserResponseDTO } from "../user/UserResponseDTO";
import { OrganizerProfileDTO } from "./OrganizerProfileDTO";

export type OrganizerProfileFormDTO = {
  profileData: Partial<OrganizerProfileDTO>;
  organizerBasicData: Pick<OrganizerProfileDTO, "name" | "email" | "phone">;
};


export type UpdatedOrganizerProfileFormResponseDTO = {

  name:string;
  email:string;
  phone:string;
  organizerId: string;
  location: string;
  organization: string;
  website: string;
  profilePicture: string;
  bio: string;
  trustScore:number ;
  totalEarnings:number ;
}