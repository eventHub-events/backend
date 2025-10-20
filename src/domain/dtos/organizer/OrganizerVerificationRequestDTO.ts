import { KycStatus } from "../../../infrastructure/db/models/user/UserModel";

export interface OrganizerVerificationRequestDTO {
  kycStatus : KycStatus;

}