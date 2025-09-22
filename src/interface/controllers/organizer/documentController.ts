import { NextFunction, Request, Response } from "express";
import { IGeneratePresignedUrlUseCase } from "../../../application/interface/organizer/IGeneratePresignedUrlUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IUploadDocumentUseCase } from "../../../application/interface/organizer/IUploadDocumentUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";


export class DocumentController{
  constructor(private _generatePresignedUrlUseCase:IGeneratePresignedUrlUseCase, private _uploadDocumentUseCase:IUploadDocumentUseCase){}

  // async getPresignedUrl(req:Request,res:Response){
 
  // try{
  //   const {fileName,contentType}=req.body;
   
  //   if(!fileName|| !contentType) return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("fileName and contentType are required"));
  //   const url= await this._generatePresignedUrlUseCase.execute(fileName,contentType);
  //   console.log("url is",url)
  //   return res.status(HttpStatusCode.OK).json(ApiResponse.success("url generated successfully",HttpStatusCode.OK,url))


  // }catch(err:unknown){
  //   const error= HandleErrorUtility.handleError(err)
  //   return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  // }
  // }

  async saveDocument(req: Request, res: Response,next :NextFunction):Promise< Response | void > {

    try {
     
      const savedDoc = await this._uploadDocumentUseCase.saveUploadedDocument(req.body);

      return res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Document saved", HttpStatusCode.CREATED, savedDoc));

    } catch (err) {
    
       next(err)

    }
}
 async getDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { organizerId } = req.params;

       if( !organizerId ){
            throw new CustomError("OrganizerId is required",HttpStatusCode.BAD_REQUEST)
         }

      const docs = await this._uploadDocumentUseCase.getUploadedDocuments(organizerId);

      return res.status(HttpStatusCode.OK).json(ApiResponse.success("Documents fetched", HttpStatusCode.OK, docs));

    } catch (err) {

        next(err)
    }
  }

//   async getViewUrl(req: Request, res: Response) {
//   try {
//     const { key } = req.query;

//     if (!key || typeof key !== "string") {
//       return res
//         .status(HttpStatusCode.BAD_REQUEST)
//         .json(ApiResponse.error("Missing or invalid 'key' parameter"));
//     }

//     // Generate signed GET URL (read access)
//     const signedUrl = await this._generatePresignedUrlUseCase.getViewUrl(key);

//     return res
//       .status(HttpStatusCode.OK)
//       .json(ApiResponse.success("View URL generated", HttpStatusCode.OK, signedUrl));
//   } catch (err) {
//     const error = HandleErrorUtility.handleError(err);
//     return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
//   }
// }
async deleteDocument( req: Request,res: Response, next: NextFunction ):Promise< Response |void>{
       try{
         const {documentId}=req.params;

         if(!documentId){
            throw new CustomError("DocumentId is required",HttpStatusCode.BAD_REQUEST)
         }
        
         
     const result    =  await this._uploadDocumentUseCase.deleteUploadedDocument(documentId);
          return res.status(HttpStatusCode.OK).json(ApiResponse.success("Document deleted successfully",HttpStatusCode.OK,result));

       }catch(err){
         next(err)
       }
}

async updateDocument( req: Request, res: Response, next : NextFunction): Promise< Response | void >{

  try{
       const{ documentId }         = req.params;
       const result                =   await this._uploadDocumentUseCase.updateUploadedDocument( documentId, req.body)
     return res.status(HttpStatusCode.OK).json(ApiResponse.success("Document updated successfully", HttpStatusCode.OK, result ))

  }catch(err){

  next(err)

  } 
 
}


}