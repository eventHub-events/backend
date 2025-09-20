
import { OrganizerProfileDTO } from "./OrganizerProfileDTO";

export type OrganizerProfileFormDTO = {
  profileData: Partial<OrganizerProfileDTO>;
  organizerBasicData: Pick<OrganizerProfileDTO, "name" | "email" | "phone">;
};


export type UpdatedOrganizerProfileFormResponseDTO = {

  name:string;
  email:string;
  phone:string;
  id:string;
  isVerified: boolean;
  isBlocked: boolean;
  organizerId: string;
  location: string;
  role : string;
  organization: string;
  website: string;
  profilePicture: string;
  bio: string;
  trustScore:number ;
  totalEarnings:number ;
}