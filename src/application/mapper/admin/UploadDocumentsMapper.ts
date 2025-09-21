import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";
import { IOrganizerUploadDocumentMapper } from "../../interface/admin/IOrganizerUploadDocumentMapper";
import { IUploadDocumentsMapper } from "../../interface/organizer/IUploadDocumentsMapper";

export class UploadDocumentsMapper implements IUploadDocumentsMapper {

  constructor(
     private _documentMapper : IOrganizerUploadDocumentMapper

  ){}

  toResponse(documentData: UploadDocument[] ):UploadDocumentResponseDTO[] {

    return documentData.map(doc => this._documentMapper.toResponse(doc));
      
  }

}