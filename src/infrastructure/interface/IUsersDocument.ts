import { Types } from 'mongoose';

export interface IUsersDocument {
  _id: Types.ObjectId | unknown;
  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isBlocked: boolean;
  kycStatus: string;
  role: string;
  createdAt?: Date;
}
