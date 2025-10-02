import { KycStatus } from "../../infrastructure/db/models/UserModel";


// export interface User {
//   id?:string;
//   name:string;
//   email:string;
//   password:string;
//   phone:number;
//   isVerified:boolean;
//   role:string;
//   kycStatus:KycStatus;
//   isBlocked:boolean;
//   isKycResubmitted : boolean;
//   createdAt?:Date;
// }

export class User {
  constructor( 
    public name: string,
    public email : string,
    public password: string,
    public phone  : number,
    public isVerified : boolean,
    public role : string,
    public kycStatus: KycStatus,
    public isBlocked: boolean,
    public isKycResubmitted?: boolean,
    public id?: string, 
    public createdAt?: Date

    ){}
}
