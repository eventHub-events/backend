export class UploadDocumentDTO {
  constructor(
    public organizerId: string,
    public type: string,
    // public url: string,
    public cloudinaryPublicId: string,
    public name: string
  ) {
    if (!organizerId || !name || !type || !cloudinaryPublicId) {
      throw new Error('Invalid document data.');
    }
  }
}
