import { UploadDocumentResponseDTO } from '../../../DTOs/admin/UploadDocumentResponseDTO';
import { UserWithDocumentsResponseDTO } from '../../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocumentDTO } from '../../../DTOs/organizer/DocumentDTO';
import { UpdateDocumentRequestDTO } from '../../../DTOs/organizer/UpdateDocumentRequestDto';
export interface IUploadDocumentUseCase {
  saveUploadedDocument(
    dto: UploadDocumentDTO
  ): Promise<UploadDocumentResponseDTO>;
  getUploadedDocuments(
    organizerId: string
  ): Promise<UserWithDocumentsResponseDTO>;
  deleteUploadedDocument(documentId: string): Promise<string>;
  updateUploadedDocument(
    documentId: string,
    dto: UpdateDocumentRequestDTO
  ): Promise<UploadDocumentResponseDTO>;
}
