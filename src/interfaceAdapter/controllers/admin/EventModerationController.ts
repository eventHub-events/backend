import { NextFunction, Response } from "express";
import { ICreateEventModerationUseCase } from "../../../application/interface/useCases/admin/event-management/ICreateEventModerationUsecase";
import { IFetchModerationByEventIdUseCase } from "../../../application/interface/useCases/admin/event-management/IFetchModerationByEventIdUseCase";
import { IUpdateEventModerationUseCase } from "../../../application/interface/useCases/admin/event-management/IUpdateEventModerationUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { EventModerationRequestDTO } from "../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { EventModerationUpdateDTO } from "../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";

export class EventModerationController  {
  constructor(
      private _createModerationUseCase : ICreateEventModerationUseCase,
      private _updateModerationUseCase : IUpdateEventModerationUseCase,
      private _fetchModerationByEventIdUseCase : IFetchModerationByEventIdUseCase
  ){}

  async create(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
     try{
         const dto : EventModerationRequestDTO = req.body;
         console.log("dddd",dto)
         if(!dto) throw new CustomError("EventModeration details is required", HttpStatusCode.BAD_REQUEST);

         const result = await this._createModerationUseCase.execute(dto);
      res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Event Moderation  details created successfully", HttpStatusCode.CREATED, result));

     }catch(err){
        next(err)
     }
    }
  async update(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try{
          const{eventId}  = req.params;
          console.log("hello",  eventId)
     if(!eventId) throw new CustomError("ModerationId is required", HttpStatusCode.BAD_REQUEST);

      const dto: EventModerationUpdateDTO = req.body;
               if(!dto) throw new CustomError("EventModeration update details is required", HttpStatusCode.BAD_REQUEST);

      const result = await this._updateModerationUseCase.execute(eventId, dto);
    res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details updated successfully", HttpStatusCode.OK, result));
    }  
     catch(err){
        next(err)
     }

    }
  async fetchDetailsByEvent(req: IAuthenticatedRequest, res: Response, next :NextFunction): Promise<void> {
     try{
         const{ eventId }   = req.params;
         if(!eventId) throw new CustomError("eventId is required", HttpStatusCode.BAD_REQUEST);

         const result = await this._fetchModerationByEventIdUseCase.execute(eventId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details fetched successfully", HttpStatusCode.OK, result));
    


     }catch(err){
        next(err)
     }
  }
}