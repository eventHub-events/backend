import { IDomainFactory } from '../../../application/interface/factories/IDomainFactory';
import { UploadDocument } from '../../../domain/entities/organizer/Document';
import { IUploadDocument } from '../../db/models/organizer/profile/UploadDocument';

export class UploadDocumentFactory implements IDomainFactory<
  IUploadDocument,
  UploadDocument
> {
  toDomain(dbModel: IUploadDocument & { _id: string }): UploadDocument {
    return new UploadDocument(
      dbModel.organizerId.toString(),
      dbModel.fileName,
      dbModel.type,
      dbModel.url,
      dbModel._id.toString(),
      dbModel.uploadedAt,
      dbModel.verified,
      dbModel.status,
      dbModel.reason,
      dbModel.reviewedBy,
      dbModel.reviewedAt
    );
  }
  toDomainList(
    dbModels: (IUploadDocument & { _id: string })[]
  ): UploadDocument[] {
    return dbModels.map(model => this.toDomain(model));
  }
}
