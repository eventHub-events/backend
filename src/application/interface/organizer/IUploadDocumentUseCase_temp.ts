import { UploadDocumentResponseDTO } from "../../../domain/DTOs/admin/UploadDocumentResponseDTO";
import { UserWithDocumentsResponseDTO } from "../../../domain/DTOs/admin/UserWithDocumentsResponseDTO";
import { UploadDocumentDTO } from "../../../domain/DTOs/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../../domain/DTOs/organizer/UpdateDocumentRequestDto";
export interface IUploadDocumentUseCase{
saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> ;
 getUploadedDocuments(organizerId: string): Promise<UserWithDocumentsResponseDTO>
 deleteUploadedDocument(documentId:string):Promise< string >
 updateUploadedDocument(  documentId:string, dto: UpdateDocumentRequestDTO ): Promise < UploadDocumentResponseDTO >
}