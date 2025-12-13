import { KycStatus } from '../../infrastructure/db/models/user/UserModel';

export interface IUserMinimal {
  _id: string;
  name: string;
  email: string;
  phone: number;
  isVerified: boolean;
  kycStatus: KycStatus;
}
