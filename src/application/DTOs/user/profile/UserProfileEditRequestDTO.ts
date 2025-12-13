import { Address } from '../../../../domain/valueObject/user/address';

export interface UserProfileEditRequestDTO {
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    userId?: string;
  };
  profile?: {
    address?: Address;
    image?: string;
    memberSince?: string;
    twoFAEnabled?: boolean;
    favorites?: string[];
  };
}
