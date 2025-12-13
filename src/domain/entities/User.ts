import { KycStatus } from '../../infrastructure/db/models/user/UserModel';
import { RegistrationTypes } from '../enums/user/Authentication';

export class UserEntity {
  name: string;
  email: string;
  password?: string;
  phone?: number;
  isVerified: boolean;
  role?: string;
  kycStatus?: KycStatus;
  isBlocked?: boolean;
  isKycResubmitted?: boolean;
  id?: string;
  createdAt?: Date;
  googleId?: string;
  registrationMode?: RegistrationTypes;
  stripeAccountId?: string;
  stripeOnboarded?: boolean;

  constructor(props: {
    name: string;
    email: string;
    password?: string;
    phone?: number;
    isVerified?: boolean;
    role?: string;
    kycStatus?: KycStatus;
    isBlocked?: boolean;
    isKycResubmitted?: boolean;
    id?: string;
    stripeAccountId?: string;
    stripeOnboarded?: boolean;
    createdAt?: Date;
    googleId?: string;
    registrationMode?: RegistrationTypes;
  }) {
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.isVerified = props.isVerified ?? false;
    this.phone = props.phone;
    this.kycStatus = props.kycStatus ?? KycStatus.NotApplicable;
    this.isBlocked = props.isBlocked ?? false;
    this.isKycResubmitted = props.isKycResubmitted ?? false;
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.googleId = props.googleId;
    this.registrationMode = props.registrationMode;
    this.stripeAccountId = props.stripeAccountId;
    this.stripeOnboarded = props.stripeOnboarded;
    this.password = props.password;
  }

  update(data: Partial<UserEntity>) {
    Object.assign(this, data);
    return this;
  }
  block() {
    this.isBlocked = true;
  }
}
