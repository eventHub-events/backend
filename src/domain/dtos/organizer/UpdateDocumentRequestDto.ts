import { DocumentStatus } from "../../enums/organizer/documentStatus";


export interface UpdateDocumentRequestDTO {
  url?  : string;
  status?: DocumentStatus;
  
}