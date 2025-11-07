export class UploadDocumentDTO {
  constructor(
    public organizerId:string,
    public type:string,
    public url:string,
    public name:string,
  )
  {
     if (!organizerId || !name || !type || !url) {
      throw new Error("Invalid document data.");
    }
  }
}