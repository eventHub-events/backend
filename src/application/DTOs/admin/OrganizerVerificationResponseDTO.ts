import { UserEntity } from "../../../domain/entities/User";


export interface OrganizerVerificationResponseDTO{
    organizerId: UserEntity,
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