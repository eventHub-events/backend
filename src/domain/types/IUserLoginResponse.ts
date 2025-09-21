import { KycStatus } from "../../infrastructure/db/models/UserModel";

export interface IUserLoginResponse{
  token:string;
  refreshToken:string;
  user:{
    id?:string,
    name:string,
    email:string,
    role:string,
    isBlocked:boolean,
    kycStatus : KycStatus,
    isKycResubmitted : boolean
  }

}