import { UploadDocumentResponseDTO } from "../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";
import { UpdateDocumentRequestDTO } from "../../domain/dtos/organizer/UpdateDocumentRequestDto";
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import { CustomError } from "../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../infrastructure/interface/enums/HttpStatusCode";
import { organizerUploadDocumentSchema, organizerUploadDocumentUpdateSchema } from "../../infrastructure/validaton/schemas/organizer/organizerUploadDocumentSchema";
import { IOrganizerUploadDocumentMapper } from "../interface/admin/IOrganizerUploadDocumentMapper";
import { IUploadDocumentsMapper } from "../interface/organizer/IUploadDocumentsMapper";
import { IUploadDocumentUseCase } from "../interface/organizer/IUploadDocumentUseCase";





export class UploadDocumentUseCase implements IUploadDocumentUseCase {
     constructor( 
          private _uploadDocumentRepo       :  IUploadDocumentRepository ,
          private _singleDocumentMapper     :  IOrganizerUploadDocumentMapper,
          private _multipleDocumentsMapper  :  IUploadDocumentsMapper
     ){}
     async saveUploadedDocument(  dto: UploadDocumentDTO ): Promise< UploadDocumentResponseDTO > {

          const validatedDTO            =   organizerUploadDocumentSchema.parse(dto);
          const  documentEntity   =   this._singleDocumentMapper.toEntity(validatedDTO)

           const savedDocument            =   await this._uploadDocumentRepo.saveDocumentData(  documentEntity ) ;
           
           if(!savedDocument){
               throw new CustomError("Failed to save document data",HttpStatusCode.INTERNAL_SERVER_ERROR)
           }

          return  this._singleDocumentMapper.toResponse(savedDocument)
          
           
     }
      async getUploadedDocuments( organizerId: string ): Promise< UploadDocumentResponseDTO []> {

           const documents = await this._uploadDocumentRepo.findByOrganizerId(organizerId);

           if(!documents || documents.length ===0 ){
               return [];
           }
           
           return this._multipleDocumentsMapper.toResponse( documents );

      }
      async deleteUploadedDocument(documentId:string):Promise< string >{

           const deleteDocument = await this._uploadDocumentRepo.findAndDeleteDocument(documentId)
           console.log("deleted document  is ",deleteDocument)
           
           if(!deleteDocument) throw new CustomError("Document not found or could not be deleted",HttpStatusCode.NOT_FOUND);
           return deleteDocument

      }
      async updateUploadedDocument(  documentId:string, dto: UpdateDocumentRequestDTO ): Promise < UploadDocumentResponseDTO > {
             console.log("request bpdy",dto)
          const validatedDto     =    organizerUploadDocumentUpdateSchema.parse(dto);
          console.log("validatedDto",validatedDto)

          if(!validatedDto.url){
               
              throw new CustomError("Document Url is required",HttpStatusCode.BAD_REQUEST)
          }
          
          const  updateData  =    this._singleDocumentMapper.toEntityForUpdate(validatedDto)
          
          const  updatedDocument          =  await this._uploadDocumentRepo.findAndUpdate( documentId , updateData)

          if(!updatedDocument ) {
               throw new CustomError( "Document not found or could not be updated",HttpStatusCode.NOT_FOUND )
          }

          return  this._singleDocumentMapper.toResponse(updatedDocument)


           
      }
}