import { KycStatus } from "../../../infrastructure/db/models/UserModel";

export interface OrganizerVerificationRequestDTO {
  kycStatus : KycStatus;

}