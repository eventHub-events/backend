import { NextFunction, Request, Response } from "express";
import { IVerificationRequestUseCase } from "../../../application/interface/organizer/IVerificationRequestUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class OrganizerDocumentVerificationRequestController {
 constructor(
       private _verificationRequestUseCase: IVerificationRequestUseCase
 ){}
 
 async completeVerificationRequest(req: Request, res: Response, next : NextFunction): Promise<Response | void> {
  try{
      const {organizerId} =  req.params;
       
      if(!organizerId){
        throw new CustomError("OrganizerId is required", HttpStatusCode.BAD_REQUEST);
      }
      const  result = await this._verificationRequestUseCase.requestVerification(organizerId,req.body);
      return res.status(HttpStatusCode.OK).json(ApiResponse.success("Verification  request  sent  successfully",HttpStatusCode.OK,result))


  }catch(err){
    next(err)
  }

 }

}