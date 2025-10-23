import { NextFunction, Response } from "express";
import {  IGetAllEventAdminUseCase } from "../../../application/interface/useCases/admin/event-management/IGetAllEventUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticateRequest";
import { NotFoundError } from "../../../domain/errors/common";
import { CustomError } from "../../../infrastructure/errors/errorClass";

export class EventManagementQueryController {
  constructor(
        private readonly _getAllEventUseCase: IGetAllEventAdminUseCase,
  ){}

  async getAllEvents(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try{
       const events = await this._getAllEventUseCase.execute();
      res.status(HttpStatusCode.OK).json(ApiResponse.success("events fetched successfully", HttpStatusCode.OK, events))

    }catch(err){
       if(err instanceof NotFoundError) throw new CustomError("Event not found", HttpStatusCode.NOT_FOUND);
       next(err)
    }
  }

}