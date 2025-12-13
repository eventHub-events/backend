export interface IUserUpdateDTO {
  name?: string;
  email?: string;
  phone?: number;
  password?: string;
  isVerified?: boolean;
  isBlocked?: boolean;
  kycStatus?: string;
}
