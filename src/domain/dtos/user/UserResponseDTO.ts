export interface UserResponseDTO {
  id?: string;
  name: string;
  email: string;
  phone: number;
  isVerified: boolean;
  role: string;
  kycStatus?:string;
  isKyCResubmitted?:string;
  isBlocked:boolean;
  createdAt?:Date
}
