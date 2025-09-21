import { NextFunction, Request, Response } from "express";
import { IGeneratePresignedUrlUseCase } from "../../../application/interface/organizer/IGeneratePresignedUrlUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";
import { IUploadDocumentUseCase } from "../../../application/interface/organizer/IUploadDocumentUSeCase";
import { UploadDocumentDTO } from "../../../domain/dtos/organizer/DocumentDTO";

export class DocumentController{
  constructor(private _generatePresignedUrlUseCase:IGeneratePresignedUrlUseCase, private _uploadDocumentUseCase:IUploadDocumentUseCase){}
  async getPresignedUrl(req:Request,res:Response){
    console.log(
      "hello  from  document "
    )
  try{
    const {fileName,contentType}=req.body;
    console.log("fileNAme and contentType are",fileName,contentType)
    if(!fileName|| !contentType) return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("fileName and contentType are required"));
    const url= await this._generatePresignedUrlUseCase.execute(fileName,contentType);
    console.log("url is",url)
    return res.status(HttpStatusCode.OK).json(ApiResponse.success("url generated successfully",HttpStatusCode.OK,url))


  }catch(err:unknown){
    const error= HandleErrorUtility.handleError(err)
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
  }
  async saveDocument(req: Request, res: Response,next :NextFunction):Promise< Response | void > {
    try {
      // const { organizerId, url, type, name } = req.body;
      console.log("req",req.body)
   
      // const dto = new UploadDocumentDTO(organizerId, type , url , name);
      // const savedDoc = await this._uploadDocumentUseCase.saveUploadedDocument(dto);
      const savedDoc = await this._uploadDocumentUseCase.saveUploadedDocument(req.body);

      return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Document saved", HttpStatusCode.CREATED, savedDoc));
    } catch (err) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error("Error saving document", HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
}
 async getDocuments(req: Request, res: Response) {
    try {
      const { organizerId } = req.params;
      const docs = await this._uploadDocumentUseCase.getUploadedDocuments(organizerId);
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("Documents fetched", HttpStatusCode.OK, docs));
    } catch (err) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ApiResponse.error("Error fetching documents", HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  }
  async getViewUrl(req: Request, res: Response) {
  try {
    const { key } = req.query;

    if (!key || typeof key !== "string") {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(ApiResponse.error("Missing or invalid 'key' parameter"));
    }

    // Generate signed GET URL (read access)
    const signedUrl = await this._generatePresignedUrlUseCase.getViewUrl(key);

    return res
      .status(HttpStatusCode.OK)
      .json(ApiResponse.success("View URL generated", HttpStatusCode.OK, signedUrl));
  } catch (err) {
    const error = HandleErrorUtility.handleError(err);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}
async deleteDocument(req:Request,res:Response):Promise<Response>{
       try{
         const {documentId}=req.params;
        
         if(!documentId){
          return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("OrganizerId is required",HttpStatusCode.BAD_REQUEST))
         }
          await this._uploadDocumentUseCase.deleteUploadedDocument(documentId)
          return res.status(HttpStatusCode.OK).json(ApiResponse.success("Document deleted successfully",HttpStatusCode.OK))
       }catch(err){
          const error = HandleErrorUtility.handleError(err);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
       }
}


}