import { KycStatus } from "../../infrastructure/db/models/UserModel";


export interface User {
  id?:string;
  name:string;
  email:string;
  password:string;
  phone:number;
  isVerified:boolean;
  role:string;
  kycStatus:KycStatus;
  isBlocked:boolean;
  isKycResubmitted : boolean;
  createdAt?:Date;
}
