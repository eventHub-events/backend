import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";
import { UploadDocumentDTO } from "../../dtos/organizer/DocumentDTO";


export interface IUploadDocumentRepository{
  saveDocumentData(DTO:UploadDocumentDTO):Promise<UploadDocument>;
   findByOrganizerId(organizerId: string): Promise<UploadDocument[]>;
  
}