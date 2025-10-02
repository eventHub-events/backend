export interface CompleteOrganizerDetailResponseDTO{
  email:string;
  role:string;
  kycStatus:string;
  createdAt?:Date;
  organizerProfile?:{
    organization:string;
    bio:string;
    location:string;
    website:string;
    trustScore?:number;
    totalEarnings?:number;
    profilePicture?:string
  }
}