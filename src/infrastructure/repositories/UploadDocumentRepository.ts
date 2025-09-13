import { IOrganizerUploadDocumentMapper } from "../../application/interface/admin/IOrganizerUploadDocumentMapper";
import { ILoggerService } from "../../application/interface/common/ILoggerService";
import { UpdatedUploadDocumentResponseDTO } from "../../domain/dtos/admin/UpdatedUploadedDocumentDTO";
import { UploadDocumentResponseDTO } from "../../domain/dtos/admin/UploadDocumentResponseDTO";
import { UploadDocumentDTO } from "../../domain/dtos/organizer/DocumentDTO";;
import { IUploadDocumentRepository } from "../../domain/repositories/organizer/IUploadDocumentRepository";
import UploadDocumentModel, { UploadDocument } from "../db/models/organizer/profile/UploadDocument";
import { BaseRepository } from "./BaseRepository";

export class UploadDocumentRepository extends BaseRepository<UploadDocument> implements IUploadDocumentRepository{
     constructor(private _logger:ILoggerService,private _uploadDocumentMapper:IOrganizerUploadDocumentMapper){
      super(UploadDocumentModel)
     }
     async saveDocumentData(DTO: UploadDocumentDTO): Promise<UploadDocumentResponseDTO> {
         const created:UploadDocument= await super.create({
      organizerId: DTO.organizerId,
      type: DTO.type,
      url: DTO.url,
      uploadedAt: new Date(),
      verified: false
    })
    const uploadDocs=this._uploadDocumentMapper.toResponse(created)
  
    return uploadDocs
     }
     async findByOrganizerId(organizerId: string): Promise<UploadDocument[]> {
         const documents = await UploadDocumentModel.find({ organizerId });
    return documents.map((doc) => doc.toObject());
     }
     async findAndUpdate(organizerId: string,data:Partial<UploadDocument>): Promise<UpdatedUploadDocumentResponseDTO> {
          try{
  const updatedDoc=await super.update(organizerId,data)
         if(!updatedDoc) throw new Error("Error in  updating document")
          const updated= this._uploadDocumentMapper.toResponseToAdmin(updatedDoc)
          
     return updated
          }catch(err:unknown){
               throw new Error("Error in Updating Document")
          }
       
     }
     async findAndDeleteDocument(documentId:string):Promise<void>{
                try{
                   await super.delete(documentId)
                 
                }catch(err:unknown){
                    throw new Error("Error in removing Document")
          }
                }

     }
   
