import { Response } from "express";

export interface IDownloadPdfUseCase{
  downloadDoc(imageUrl:string,res:Response,organizerName?:string):Promise<void>

}