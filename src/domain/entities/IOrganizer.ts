import { UserEntity } from './User';

export interface IOrganizer extends UserEntity {
  companyName: string;
  // kycStatus:string;
  totalEarnings: number;
  trustScore: number;
  profileDescription?: string;
  image?: string;
  isBlock: boolean;
}
