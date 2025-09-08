import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";
import { UploadDocument } from "../../../infrastructure/db/models/organizer/profile/UploadDocument";

export interface IUploadDocumentUseCase{
  saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocument>;
  getUploadedDocuments(organizerId: string): Promise<UploadDocument[]>;
}