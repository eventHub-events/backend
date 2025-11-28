import { Address } from "../../../../domain/valueObject/user/address";

export interface UserProfileResponseDTO {
  
    name: string;
    email: string;
    phone: string;
    profileId?: string,
    address: Address,
    image?: string ,
    memberSince?: string,
    twoFAEnabled?: boolean, 
    favorites?: string[]
    
  }
