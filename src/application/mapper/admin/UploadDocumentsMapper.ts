import { UploadDocumentResponseDTO } from "../../DTOs/admin/UploadDocumentResponseDTO";
import { UserWithDocumentsResponseDTO } from "../../DTOs/admin/UserWithDocumentsResponseDTO";
import { UserResponseDTO } from "../../DTOs/user/UserResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";
import { User } from "../../../domain/entities/User";
import { IOrganizerUploadDocumentMapper } from "../../interface/useCases/admin/IOrganizerUploadDocumentMapper";
import { IUploadDocumentsMapper } from "../../interface/useCases/organizer/IUploadDocumentsMapper";

export class UploadDocumentsMapper implements IUploadDocumentsMapper {

  constructor(
     private _documentMapper : IOrganizerUploadDocumentMapper

  ){}

  toResponse(documentData: UploadDocument[],userData: User ): UserWithDocumentsResponseDTO {

    const userDocs= documentData.map(doc => this._documentMapper.toResponse(doc));
    return {
       id               : userData.id,
       name             : userData.name,
       isVerified       : userData.isVerified,
       kycStatus        : userData.kycStatus,
       isKycResubmitted : userData.isKycResubmitted,
       documents  : userDocs

    }
      
  }

}