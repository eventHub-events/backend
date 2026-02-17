import { KycStatus } from '../../../infrastructure/db/models/user/UserModel';

export interface UserRegisterDTO {
  name: string;

  email: string;

  phone?: number;

  password: string;

  isVerified?: boolean;

  role: string;
  isBlocked: boolean;
  kycStatus: KycStatus;
  isKycResubmitted?: boolean;
  hasPassword?: boolean;
  isKycSubmitted?: boolean,
  isProfileCompleted?:boolean,
  isSubscribed?:boolean,
  isStripeConnected?:boolean
}
