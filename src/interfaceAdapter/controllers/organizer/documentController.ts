import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IUploadDocumentUseCase } from "../../../application/interface/useCases/organizer/IUploadDocumentUseCase_temp";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";



export class DocumentController{
  constructor(
    
    private _uploadDocumentUseCase:IUploadDocumentUseCase){}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
  async saveDocument(req: Request, res: Response,next : NextFunction): Promise< Response | void > {

    try {
     
      const savedDoc = await this._uploadDocumentUseCase.saveUploadedDocument(req.body);

      return res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.DOCUMENT_SAVE, HttpStatusCode.CREATED, savedDoc));

    } catch (err) {
    
       next(err)

    }
}

 async getDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { organizerId } = req.params;

       if( !organizerId ){
            throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
         }

      const docs = await this._uploadDocumentUseCase.getUploadedDocuments(organizerId);

      return res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.FETCH_SUCCESS, HttpStatusCode.OK, docs));

    } catch (err) {

        next(err)
    }
  }
async deleteDocument( req: Request,res: Response, next: NextFunction ):Promise< Response |void>{
       try{
         const {documentId} = req.params;
        

         if(!documentId){
            throw new CustomError(ErrorMessages.UPLOAD_DOCUMENT.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
         }
        
         
     const result = await this._uploadDocumentUseCase.deleteUploadedDocument(documentId);
          return res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.DOCUMENT_DELETE_SUCCESS,HttpStatusCode.OK,result));

       }catch(err){
         next(err)
       }
}

async updateDocument( req: Request, res: Response, next : NextFunction): Promise< Response | void >{

  try{
       const{ documentId } = req.params;
         if(!documentId){
            throw new CustomError(ErrorMessages.UPLOAD_DOCUMENT.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
         }

       const result =   await this._uploadDocumentUseCase.updateUploadedDocument( documentId, req.body);
     return res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.DOCUMENT_UPDATE_SUCCESS, HttpStatusCode.OK, result ));

  }catch(err){

  next(err)

  } 
 
}


}