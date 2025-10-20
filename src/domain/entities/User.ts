import { KycStatus } from "../../infrastructure/db/models/user/UserModel";




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
