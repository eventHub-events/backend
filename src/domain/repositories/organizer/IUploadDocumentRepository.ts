
import { UpdatedUploadDocumentResponseDTO } from "../../dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocument } from "../../entities/organizer/Document";


export interface IUploadDocumentRepository{
 saveDocumentData( documentData : UploadDocument ): Promise< UploadDocument>
   findByOrganizerId(organizerId: string): Promise<UploadDocument[]>;
  findAndUpdate(organizerId: string,data:Partial<UploadDocument>): Promise<UpdatedUploadDocumentResponseDTO>
  findAndDeleteDocument(documentId:string):Promise<void>
  
}