import { NextFunction, Response } from "express";
import { ICreateEventReportUseCase } from "../../../application/interface/useCases/common/report/user/ICreateEventReportUseCase";
import { ICreateOrganizerReportUseCase } from "../../../application/interface/useCases/common/report/user/ICreateOrganizerReportUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CreateReportDTO } from "../../../application/DTOs/common/report/CreateReportDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../../domain/errors/common";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ICreateChatMessageReportUseCase } from "../../../application/interface/useCases/common/report/chat/ICreateChatMessageUseCase";

export class ReportController {
   constructor(
      private _organizerReportUseCase : ICreateOrganizerReportUseCase,
      private _eventReportUseCase : ICreateEventReportUseCase,
      private _chatReportUseCase : ICreateChatMessageReportUseCase
   ){}

  async createOrganizerReport(req: IAuthenticatedRequest, res : Response, next : NextFunction): Promise<void> {
    try{
          const dto: CreateReportDTO = req.body;
         const created = await this._organizerReportUseCase.execute(dto);
      res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.REPORT.REPORT_SUCCESS,HttpStatusCode.CREATED, created));

    }catch(err){
         if(err instanceof UnauthorizedError) throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
       next(err)
    }
  }
 async createEventReport(req: IAuthenticatedRequest, res: Response, next:NextFunction): Promise<void> {
      try{
          const dto: CreateReportDTO = req.body;
         const created = await this._eventReportUseCase.execute(dto);
      res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.REPORT.REPORT_SUCCESS,HttpStatusCode.CREATED, created));

    }catch(err){
       if(err instanceof UnauthorizedError) throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
       next(err)
    }
 }
 async CreateChatMessageReport(req: IAuthenticatedRequest, res :Response, next: NextFunction) : Promise<void> {
     try{
           const dto: CreateReportDTO = req.body;
           const created = await this._chatReportUseCase.execute(dto);
          res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.REPORT.REPORT_SUCCESS,HttpStatusCode.CREATED, created));

     }catch(err){
       if(err instanceof BadRequestError) throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
       if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
     }
 }
}