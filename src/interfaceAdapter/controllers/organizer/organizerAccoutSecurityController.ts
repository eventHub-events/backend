import { NextFunction, Request, Response } from "express";
import { IOrganizerAccountSecurityUseCase } from "../../../application/interface/organizer/IOrganizerAccountSecurityUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { CustomError } from "../../../infrastructure/errors/errorClass";

export class OrganizerAccountSecurityController{
  constructor( private _organizerAccountSecurityUseCase: IOrganizerAccountSecurityUseCase ){}

  async updatePassword(req:Request, res:Response, next: NextFunction): Promise<Response |void>{
    try{
        const {organizerId} = req.params;
        console.log("id is org",organizerId)
    if(!organizerId){
     throw new CustomError("OrganizerId is required", HttpStatusCode.BAD_REQUEST);
  
    }
  
     
    const  result = await this._organizerAccountSecurityUseCase.changePassword(organizerId,req.body);
     
return res.status(HttpStatusCode.OK).json(ApiResponse.success("Password Updated successfully",HttpStatusCode.OK,result));

   


}  catch(err){
    next(err)
  }
}
}
