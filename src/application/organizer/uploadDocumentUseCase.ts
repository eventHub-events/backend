import { UploadDocumentResponseDTO } from "../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { organizerUploadDocumentSchema } from "../../infrastructure/validaton/schemas/organizer/organizerUploadDocumentSchema";
import { IOrganizerUploadDocumentMapper } from "../interface/admin/IOrganizerUploadDocumentMapper";
import { IUploadDocumentUseCase } from "../interface/organizer/IUploadDocumentUSeCase";




export class UploadDocumentUseCase implements IUploadDocumentUseCase{
     constructor( 
          private _uploadDocumentRepo  :  IUploadDocumentRepository ,
          private _uploadDocumentMapper:  IOrganizerUploadDocumentMapper
     ){}
     async saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> {

          const validated             =              organizerUploadDocumentSchema.parse(dto);
          const  documentEntityData   =  this._uploadDocumentMapper.toEntity(validated)

           const savedData            = await this._uploadDocumentRepo.saveDocumentData(  documentEntityData ) ;
           const responseData        =  this._uploadDocumentMapper.toResponse(savedData)
           console.log("response data",responseData)
           return responseData
     }
      async getUploadedDocuments(organizerId: string): Promise<UploadDocument[]> {
           return await this._uploadDocumentRepo.findByOrganizerId(organizerId);
      }
      async deleteUploadedDocument(documentId:string):Promise<void>{
           return await this._uploadDocumentRepo.findAndDeleteDocument(documentId)

      }
      async updateUploadedDocument( documentId : string ): Promise < UploadDocumentResponseDTO > {
           
      }
}