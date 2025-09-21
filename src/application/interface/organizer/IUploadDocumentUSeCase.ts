import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
export interface IUploadDocumentUseCase{
saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> ;
 getUploadedDocuments(organizerId: string): Promise<UploadDocumentResponseDTO[]>
  deleteUploadedDocument(documentId:string):Promise<void>
}