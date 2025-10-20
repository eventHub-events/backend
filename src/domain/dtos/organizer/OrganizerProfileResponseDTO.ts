import { KycStatus } from "../../../infrastructure/db/models/user/UserModel";
import { IUserMinimal } from "../../types/IUserMinimal";

export interface OrganizerProfileResponseDTO{
  organizerId:IUserMinimal;
  location:string,
  organization:string,
  bio:string;
  website:string;
  trustScore:number;
  totalEarnings:number;
  kycVerified?:boolean;
  profilePicture:string;
  organizerDocs?:{
    organizerId:string;
  name:string;  
  type:string;
  url:string;
  uploadedAt:Date;
  kycStatus: KycStatus;
   verified: boolean;
  }
}