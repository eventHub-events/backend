import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";;
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import UploadDocumentModel, { UploadDocument } from "../db/models/organizer/profile/UploadDocument";
import { BaseRepository } from "./BaseRepository";

export class UploadDocumentRepository extends BaseRepository<UploadDocument> implements IUploadDocumentRepository{
     constructor(private _logger:ILoggerService){
      super(UploadDocumentModel)
     }
     async saveDocumentData(DTO: UploadDocumentDTO): Promise<UploadDocument> {
         const created:UploadDocument= await super.create({
      organizerId: DTO.organizerId,
      type: DTO.type,
      url: DTO.url,
      uploadedAt: new Date(),
      verified: false
    })
    const plain= created.toObject() as UploadDocument;
    return plain
     }
     async findByOrganizerId(organizerId: string): Promise<UploadDocument[]> {
         const documents = await UploadDocumentModel.find({ organizerId });
    return documents.map((doc) => doc.toObject());
     }
}