

import { UploadDocument } from "../../entities/organizer/Document";


export interface IUploadDocumentRepository{
   saveDocumentData( documentData : UploadDocument ): Promise< UploadDocument>
   findByOrganizerId(organizerId: string): Promise<UploadDocument[]>;
  findAndUpdate(organizerId: string,data:Partial<UploadDocument>): Promise< UploadDocument >
  findAndDeleteDocument(documentId:string):Promise< string >
  
}