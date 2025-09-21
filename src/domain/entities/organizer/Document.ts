

import { DocumentStatus } from "../../enums/organizer/documentstatus";

export class UploadDocument {
  constructor (
    public organizerId: string,
    public  fileName: string,
    public   type: string,
    public   url: string,
    public readonly id?: string,
    public   uploadedAt?: Date,
     public    verified?: boolean,
     public  status?: DocumentStatus,
     public  reason?: string,
     public  reviewedBy?: string,
     public  reviewedAt?: Date,
     
  ){}
}
