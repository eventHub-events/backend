import { Request, Response } from "express";
import { IDownloadPdfUseCase } from "../../../application/interface/admin/IDownloadPdfUseCase";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";



export class DownloadPdfController {
  constructor(private _downloadPdfUseCase:IDownloadPdfUseCase){}
  async downloadPdf(req:Request,res:Response){
    const{imageUrl,organizerName}=req.query;
    if(!imageUrl || typeof imageUrl !=='string'){
      return res.status(HttpStatusCode.BadRequest).json(ApiResponse.error('Missing or inValid imageUrl',HttpStatusCode.BadRequest))
    }
    await this._downloadPdfUseCase.downloadDoc(imageUrl,res)
  }

}