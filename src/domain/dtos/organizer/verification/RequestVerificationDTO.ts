import { KycStatus } from "../../../../infrastructure/db/models/UserModel";

export interface RequestVerificationDTO {
  kycStatus : KycStatus.Pending
}