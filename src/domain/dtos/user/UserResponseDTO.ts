export interface UserResponseDTO {
  _id: string;
  name: string;
  email: string;
  phone: number;
  isVerified?: boolean;
  role: string;
  kycStatus?:string
  isBlocked:boolean;
  createdAt?:Date
}
