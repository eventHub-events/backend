import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";

export interface IOrganizerUploadDocumentMapper{
  toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO;
  toResponseToAdmin(UploadDocument:UploadDocument):UpdatedUploadDocumentResponseDTO; 
  toEntity( dto: UploadDocumentDTO) : UploadDocument;
}