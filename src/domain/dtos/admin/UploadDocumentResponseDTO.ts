// 

import { DocumentStatus } from "../../enums/organizer/documentStatus";



export interface UploadDocumentResponseDTO {

    id?           : string;  
    organizerId   : string;
    name          : string;
    type          : string;
    url           : string;
    uploadedAt?   : Date;
    status?       : DocumentStatus;
    verified?     : boolean;
    reason?       : string;
    reviewedAt?   : Date;
    reviewedBy?   : string;


}

