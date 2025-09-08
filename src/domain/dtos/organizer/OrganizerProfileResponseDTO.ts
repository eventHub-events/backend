import { IUserMinimal } from "../../types/IUserMinimal";

export interface OrganizerProfileResponseDTO{
  organizerId:IUserMinimal;
  location:string,
  organization:string,
  bio:string;
  website:string;
  trustScore:number;
  totalEarnings:number;
  kycVerified:boolean;
  profilePicture:string;
}