import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";

export interface IUploadDocumentUseCase{
saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> ;
  getUploadedDocuments(organizerId: string): Promise<UploadDocument[]>;
  deleteUploadedDocument(documentId:string):Promise<void>
}