import { NextFunction, Response } from "express";
import { IDownloadPdfUseCase } from "../../../application/interface/useCases/admin/IDownloadPdfUseCase";

import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { ErrorMessages } from "../../../constants/errorMessages";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { CustomError } from "../../../infrastructure/errors/errorClass";



export class DownloadPdfController {
  constructor(private _downloadPdfUseCase:IDownloadPdfUseCase){}
  async downloadPdf(req: IAuthenticatedRequest, res:Response, next: NextFunction): Promise<void>{
    try{
         const{imageUrl, docType}=req.body;
          if(!imageUrl || typeof imageUrl !=='string'){
              throw new CustomError(ErrorMessages.UPLOAD_DOCUMENT.INVALID_URL,HttpStatusCode.BAD_REQUEST);
          }
          await this._downloadPdfUseCase.downloadDoc(imageUrl,res,docType);
        res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.UPLOAD_DOCUMENT.DOWNLOAD_SUCCESS,HttpStatusCode.NOT_FOUND));
    }catch(err){
      next(err);
    }
  }
}