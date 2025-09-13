import { UpdatedUploadDocumentResponseDTO } from "../../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocument } from "../../../domain/entities/organizer/Document";

export interface IOrganizerUploadDocumentMapper{
  toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO;
  toResponseToAdmin(UploadDocument:UploadDocument):UpdatedUploadDocumentResponseDTO;
}