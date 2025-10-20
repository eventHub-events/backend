

import { UploadDocument } from "../../entities/organizer/Document";


export interface IUploadDocumentRepository{
   saveDocumentData( documentData : UploadDocument ): Promise< UploadDocument>
   findDocuments(organizerId: string): Promise<UploadDocument[]>;
  updateDocument(organizerId: string,data:Partial<UploadDocument>): Promise< UploadDocument >
  deleteDocument(documentId:string):Promise< string >
  
}