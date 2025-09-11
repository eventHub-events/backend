export interface UserWithOrganizerProfileDTO{
  _id:string;
  name:string;
  email:string;
  role:string;
  kycStatus:string;
  createdAt:Date;
  organizerProfile?:{
    organization:string;
    bio:string;
    location:string;
    website:string;
    trustScore?:string;
    totalEarnings?:number;
    profilePicture?:string
  }
}