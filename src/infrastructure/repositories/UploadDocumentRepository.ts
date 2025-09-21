import { IOrganizerUploadDocumentMapper } from "../../application/interface/admin/IOrganizerUploadDocumentMapper";
import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { UpdatedUploadDocumentResponseDTO } from "../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocument } from "../../domain/entities/organizer/Document";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import UploadDocumentModel, {
  IUploadDocument,
} from "../db/models/organizer/profile/UploadDocument";
import { CustomError } from "../errors/errorClass";
import { HttpStatusCode } from "../interface/enums/HttpStatusCode";
import { BaseRepository } from "./BaseRepository";

export class UploadDocumentRepository
  extends BaseRepository< IUploadDocument >
  implements IUploadDocumentRepository
{
  constructor(

    private _logger: ILoggerService,
    private _uploadDocumentMapper: IOrganizerUploadDocumentMapper

  ) {
    super(UploadDocumentModel);
  }
  async saveDocumentData(  
    documentData: UploadDocument
  ): Promise<UploadDocument> {
    const created = (await super.create(documentData)) as UploadDocument & {
      _id: string;
    };
 

    return new UploadDocument(
      created.organizerId,
      created.fileName,
      created.type,
      created.url,
      created._id.toString(),
      created.uploadedAt,
      created.verified,
      created.status,
      created.reason,
      created.reviewedBy,
      created.reviewedAt
    );

  }
  async findByOrganizerId(organizerId: string): Promise<UploadDocument[]> {
    const documents = await UploadDocumentModel.find({ organizerId }) as (UploadDocument & { _id: string })[]
    return documents.map((doc ) => 
    new UploadDocument(
      doc.organizerId.toString(),
      doc.fileName,
      doc.type,
      doc.url,
      doc._id.toString(),
      doc.uploadedAt,
      doc.verified,
      doc.status,
      doc.reason,
      doc.reviewedBy,
      doc.reviewedAt
    )
  );
   

  }
  async findAndUpdate(
    organizerId: string,
    data: Partial<UploadDocument>
  ): Promise< UploadDocument> {
    
      const updatedDoc = await super.update(organizerId, data)as UploadDocument & {
      _id: string;
    };
      if (!updatedDoc) throw new CustomError("Error in  updating document",HttpStatusCode.INTERNAL_SERVER_ERROR);
       return new UploadDocument(
      updatedDoc.organizerId,
      updatedDoc.fileName,
      updatedDoc.type,
      updatedDoc.url,
     updatedDoc._id.toString(),
      updatedDoc.uploadedAt,
      updatedDoc.verified,
      updatedDoc.status,
      updatedDoc.reason,
     updatedDoc.reviewedBy,
      updatedDoc.reviewedAt
    );

      // const updated = this._uploadDocumentMapper.toResponseToAdmin(updatedDoc);

      // return updated;
  }
  
  async findAndDeleteDocument(documentId: string): Promise<void> {
    try {
      await super.delete(documentId);
    } catch (err: unknown) {
      throw new Error("Error in removing Document");
    }
  }
}
