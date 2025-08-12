import { User } from "./User";

export interface IOrganizer extends User{
  companyName:string;
  // kycStatus:string;
  totalEarnings:number;
  trustScore :number
  profileDescription?:string;
  image?:string;
  isBlock:boolean;

}