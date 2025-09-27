import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";


export interface IUploadDocumentsMapper {
  toResponse( documentData : UploadDocument[] ): UploadDocumentResponseDTO[]

}