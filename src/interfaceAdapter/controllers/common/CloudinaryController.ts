import { NextFunction, Response } from "express";
import { IGetUploadSignatureUseCase } from "../../../application/interface/useCases/common/cloudinary/IGetUploadSignatureUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ErrorMessages } from "../../../constants/errorMessages";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class CloudinaryController {
    constructor(
       private readonly _getUploadSignatureUseCase : IGetUploadSignatureUseCase
    ){}

 async getSignature (req : IAuthenticatedRequest, res : Response, next : NextFunction) : Promise<void> {
   try{
   
       const folder  = req.query.folder as string;

       if(!folder) throw new CustomError(ErrorMessages.CLOUDINARY.FOLDER_REQUIRED_ERROR, HttpStatusCode.BAD_REQUEST);
       const  data = await this._getUploadSignatureUseCase.execute(folder);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CLOUDINARY.CLOUDINARY_SIGNATURE_CREATION_SUCCESS,HttpStatusCode.OK, data));

   }catch(err){
    next(err)
   }
 }
}