import { KycStatus } from "../../../infrastructure/db/models/UserModel";
import { UploadDocumentResponseDTO } from "./UploadDocumentResponseDTO";


export interface UserWithDocumentsResponseDTO{
  id?: string;
  name : string;
  isVerified :boolean;
  kycStatus : KycStatus;
  isKycResubmitted?: boolean;
  documents :UploadDocumentResponseDTO[]
}