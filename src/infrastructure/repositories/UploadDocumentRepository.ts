
import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { IUploadDocumentFactory } from "../../application/interface/factories/IUploadDocumentFactory";
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
    private _domainFactory: IUploadDocumentFactory
  

  ) {
    super(UploadDocumentModel);
  }

  async saveDocumentData(  
    documentData: UploadDocument
  ): Promise<UploadDocument> {
    const created = (await super.create(documentData)) as IUploadDocument & {
      _id: string;
    };

return this._domainFactory.toDomain(created)
  
  }


  async findDocuments(organizerId: string): Promise<UploadDocument[]> {
    const documents = await super.findAll({ organizerId }) as (IUploadDocument & { _id: string })[]

    return this._domainFactory.toDomainList(documents)

  }
  
  async updateDocument(
    organizerId: string,
    data: Partial<UploadDocument>
  ): Promise< UploadDocument> {
    
      const updatedDoc = await super.update(organizerId, data)as IUploadDocument & {
      _id: string;
    };
      if (!updatedDoc) throw new CustomError("Error in  updating document",HttpStatusCode.INTERNAL_SERVER_ERROR);
      return this._domainFactory.toDomain(updatedDoc)
   
    
  }
  
  async deleteDocument(documentId: string): Promise< string > {
    
      await super.delete(documentId);
      return "Document deleted successfully"
    
  }
}
