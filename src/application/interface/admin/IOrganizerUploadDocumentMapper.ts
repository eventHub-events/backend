import { UpdatedUploadDocumentResponseDTO } from "../../../domain/DTOs/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../domain/DTOs/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/DTOs/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../../domain/DTOs/organizer/UpdateDocumentRequestDto";
import { UploadDocument } from "../../../domain/entities/organizer/Document";

export interface IOrganizerUploadDocumentMapper{
  toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO;
  toResponseToAdmin(UploadDocument:UploadDocument):UpdatedUploadDocumentResponseDTO; 
  toEntity( dto: UploadDocumentDTO) : UploadDocument;
  toEntityForUpdate( dto: UpdateDocumentRequestDTO) : Partial<UploadDocument >;
}