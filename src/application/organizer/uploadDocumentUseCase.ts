import { UploadDocumentResponseDTO } from "../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../domain/dtos/organizer/UpdateDocumentRequestDto";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { CustomError } from "../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { organizerUploadDocumentSchema, organizerUploadDocumentUpdateSchema } from "../../infrastructure/validaton/schemas/organizer/organizerUploadDocumentSchema";
import { IOrganizerUploadDocumentMapper } from "../interface/admin/IOrganizerUploadDocumentMapper";
import { IUploadDocumentsMapper } from "../interface/organizer/IUploadDocumentsMapper";
import { IUploadDocumentUseCase } from "../interface/organizer/IUploadDocumentUSeCase";




export class UploadDocumentUseCase implements IUploadDocumentUseCase{
     constructor( 
          private _uploadDocumentRepo     :  IUploadDocumentRepository ,
          private _uploadDocumentMapper   :  IOrganizerUploadDocumentMapper,
          private _uploadDocumentsMapper  :  IUploadDocumentsMapper
     ){}
     async saveUploadedDocument(dto: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> {

          const validated             =   organizerUploadDocumentSchema.parse(dto);
          const  documentEntityData   =   this._uploadDocumentMapper.toEntity(validated)

           const savedData            =   await this._uploadDocumentRepo.saveDocumentData(  documentEntityData ) ;
           const responseData         =   this._uploadDocumentMapper.toResponse(savedData)
          
           return responseData
     }
      async getUploadedDocuments(organizerId: string): Promise<UploadDocumentResponseDTO[]> {

           const result = await this._uploadDocumentRepo.findByOrganizerId(organizerId);
           
           return this._uploadDocumentsMapper.toResponse(result);

      }
      async deleteUploadedDocument(documentId:string):Promise<void>{
           return await this._uploadDocumentRepo.findAndDeleteDocument(documentId)

      }
      async updateUploadedDocument(  documentId, dto: UpdateDocumentRequestDTO ): Promise < UploadDocumentResponseDTO > {

          const validated       =    organizerUploadDocumentUpdateSchema.parse(dto);
          if(validated.url){
               
              throw new CustomError("Document Url is required",HttpStatusCode.BAD_REQUEST)
          }
          
          const  convertedData  =    this._uploadDocumentMapper.toEntityForUpdate(validated)
          
          const result          =  await this._uploadDocumentRepo.findAndUpdate( documentId , convertedData)

          return  this._uploadDocumentMapper.toResponse(result)


           
      }
}