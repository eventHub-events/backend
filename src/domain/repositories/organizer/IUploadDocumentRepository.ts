import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";
import { UpdatedUploadDocumentResponseDTO } from "../../dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../dtos/organizer/DocumentDTO";


export interface IUploadDocumentRepository{
  saveDocumentData(DTO: UploadDocumentDTO): Promise<UploadDocumentResponseDTO>
   findByOrganizerId(organizerId: string): Promise<UploadDocument[]>;
  findAndUpdate(organizerId: string,data:Partial<UploadDocument>): Promise<UpdatedUploadDocumentResponseDTO>
  findAndDeleteDocument(documentId:string):Promise<void>
  
}