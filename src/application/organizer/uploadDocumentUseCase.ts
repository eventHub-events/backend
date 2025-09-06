import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { UploadDocument } from "../../infrastructure/db/models/organizer/profile/UploadDocument";
import { IUploadDocumentUseCase } from "../interface/organizer/IUploadDocumentUSeCase";

export class UploadDocumentUseCase implements IUploadDocumentUseCase{
     constructor(private _uploadDocumentRepo:IUploadDocumentRepository){}
     async saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocument> {
          return await this._uploadDocumentRepo.saveDocumentData(dto);
     }
     async getUploadedDocuments(organizerId: string): Promise<UploadDocument[]> {
          return await this._uploadDocumentRepo.findByOrganizerId(organizerId);
     }
}