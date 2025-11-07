import { User } from "../../../domain/entities/User";
import { IUserMinimal } from "../../../domain/types/IUserMinimal";

export interface OrganizerVerificationResponseDTO{
    organizerId: User,
    location:string,
    organization:string,
    bio:string;
    website:string;
    trustScore:number;
    totalEarnings:number;
    kycVerified?:boolean;
    profilePicture:string;
    documents:{
        organizerId?:string;
  name:string;
  type:string;
  url:string;
  uploadedAt?:Date;
  status?:"Pending"|"Approved"|"Rejected";
  verified?:boolean;
    }[]

}