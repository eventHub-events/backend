import { UploadDocument } from '../../../domain/entities/organizer/Document';
import { IUploadDocument } from '../../../infrastructure/db/models/organizer/profile/UploadDocument';

export interface IUploadDocumentFactory {
  toDomain(dbModel: IUploadDocument & { _id: string }): UploadDocument;
  toDomainList(
    dbModels: (IUploadDocument & { _id: string })[]
  ): UploadDocument[];
}
