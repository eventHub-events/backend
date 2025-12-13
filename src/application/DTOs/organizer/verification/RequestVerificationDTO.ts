import { KycStatus } from '../../../../infrastructure/db/models/user/UserModel';

export interface RequestVerificationDTO {
  kycStatus: KycStatus.Pending;
}
