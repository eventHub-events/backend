import { NextFunction, Request, Response } from "express";
import { IOrganizerAccountSecurityUseCase } from "../../../application/interface/useCases/organizer/IOrganizerAccountSecurityUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class OrganizerAccountSecurityController{
  constructor( private _organizerAccountSecurityUseCase: IOrganizerAccountSecurityUseCase ){}

  async updatePassword(req:Request, res:Response, next: NextFunction): Promise<Response |void>{
    try{
        const {organizerId} = req.params;
       
    if(!organizerId){
     throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
  
    }
    const  result = await this._organizerAccountSecurityUseCase.changePassword(organizerId,req.body);    
return res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.PROFILE.PASSWORD_UPDATE_SUCCESS,HttpStatusCode.OK,result));

}  catch(err){
    next(err)
  }
}
}
