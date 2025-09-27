import { UploadDocumentResponseDTO } from "../../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../../domain/dtos/organizer/UpdateDocumentRequestDto";
export interface IUploadDocumentUseCase{
saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> ;
 getUploadedDocuments(organizerId: string): Promise<UploadDocumentResponseDTO[]>
 deleteUploadedDocument(documentId:string):Promise< string >
 updateUploadedDocument(  documentId:string, dto: UpdateDocumentRequestDTO ): Promise < UploadDocumentResponseDTO >
}