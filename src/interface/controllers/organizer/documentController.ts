import { Request, Response } from "express";
import { IGeneratePresignedUrlUseCase } from "../../../application/interface/organizer/IGeneratePresignedUrlUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { HandleErrorUtility } from "../../../utils/HandleErrorUtility";

export class DocumentController{
  constructor(private _generatePresignedUrlUseCase:IGeneratePresignedUrlUseCase){}
  async getPresignedUrl(req:Request,res:Response){
  try{
    const {fileName,contentType}=req.body;
    if(!fileName|| !contentType) return res.status(HttpStatusCode.BAD_REQUEST).json(ApiResponse.error("fileName and contentType are required"));
    const url= await this._generatePresignedUrlUseCase.execute(fileName,contentType);
    return res.status(HttpStatusCode.OK).json(ApiResponse.success("url generated successfully",HttpStatusCode.OK,url))


  }catch(err:unknown){
    const error= HandleErrorUtility.handleError(err)
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
  }
}