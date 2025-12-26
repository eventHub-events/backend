import mongoose, { Document, Schema } from 'mongoose';
import { RegistrationTypes } from '../../../../domain/enums/user/Authentication';

export enum KycStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  NotApplicable = 'N/A',
}
export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: number;
  isVerified: boolean;
  isBlocked: boolean;
  role: string;
  kycStatus: KycStatus;
  createdAt?: Date;
  isKycResubmitted: boolean;
  googleId?: string;
  registrationMode?: RegistrationTypes;
  stripeAccountId?: string;
  stripeOnboarded?: boolean;
  hasPassword?: boolean
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    hasPassword : {
        type :String
    },
    phone: { type: Number },
    isVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      enum: Object.values(KycStatus),
      default: KycStatus.NotApplicable,
    },
    isBlocked: { type: Boolean, default: false },
    isKycResubmitted: {
      type: Boolean,
      default: false,
    },
    stripeAccountId: {
      type: String,
      default: null,
    },
    stripeOnboarded: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    registrationMode: {
      type: String,
      enum: Object.values(RegistrationTypes),
      default: RegistrationTypes.Normal,
    },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>('User', UserSchema);
