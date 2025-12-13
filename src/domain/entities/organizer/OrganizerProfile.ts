// export interface IOrganizerProfile{
//    organizerId?:string,
//    location:string,
//    organization:string,
//    website:string,
//    profilePicture:string,
//    bio:string,
//    kycVerified:boolean,
//    totalEarnings:number,
//    trustScore:number

// }

// export interface OrganizerProfile{
//    organizerId?:string,
//    location:string,
//    organization:string,
//    website:string,
//    profilePicture:string,
//    bio:string,
//    kycVerified:boolean,
//    totalEarnings:number,
//    trustScore:number

// }
export class OrganizerProfile {
  constructor(
    public location: string,
    public organization: string,
    public website: string,
    public profilePicture: string,
    public bio: string,
    public totalEarnings: number,
    public trustScore: number,
    public organizerId?: string,
    public kycVerified?: boolean
  ) {}
}
