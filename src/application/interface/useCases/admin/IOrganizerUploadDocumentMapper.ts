import { UpdatedUploadDocumentResponseDTO } from "../../../DTOs/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../../DTOs/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../DTOs/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../../DTOs/organizer/UpdateDocumentRequestDto";
import { UploadDocument } from "../../../../domain/entities/organizer/Document";

export interface IOrganizerUploadDocumentMapper{
  toResponse(UploadDocument:UploadDocument):UploadDocumentResponseDTO;
  toResponseToAdmin(UploadDocument:UploadDocument):UpdatedUploadDocumentResponseDTO; 
  toEntity( dto: UploadDocumentDTO) : UploadDocument;
  toEntityForUpdate( dto: UpdateDocumentRequestDTO) : Partial<UploadDocument >;
}