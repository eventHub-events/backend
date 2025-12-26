import { RegistrationTypes } from "../../../domain/enums/user/Authentication";

export interface UserResponseDTO {
  id?: string;
  name: string;
  email: string;
  phone?: number;
  isVerified: boolean;
  role: string;
  kycStatus?: string;
  isKyCResubmitted?: string;
  isBlocked?: boolean;
  createdAt?: Date;
  hasPassword?: boolean;
  stripeOnboarded?: boolean;
  registrationMode?: RegistrationTypes;
}
