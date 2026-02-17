import { KycStatus } from '../../../infrastructure/db/models/user/UserModel';
import { UploadDocumentResponseDTO } from './UploadDocumentResponseDTO';

export interface UserWithDocumentsResponseDTO {
  id?: string;
  name: string;
  isVerified: boolean;
  kycStatus: KycStatus;
  isKycResubmitted?: boolean;
  documents: UploadDocumentResponseDTO[];
  isBlocked?:boolean;
  hasPassword?:boolean;
  stripOnboarded?:boolean ,
  isProfileCompleted?: boolean,
  isKycSubmitted?:boolean,
  isSubscribed?:boolean ,
  isStripeConnected?: boolean
}
