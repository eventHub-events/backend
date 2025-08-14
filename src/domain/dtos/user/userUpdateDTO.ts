  export interface IUserUpdateDTO {
  name?: string;
  email?: string;
  phone?: string;
  password?:string;
  isVerified?: boolean;
  isBlocked?: boolean;
  kycStatus?:string
  }