import { NextFunction, Request, Response } from "express";
import { ICreateEventUseCase } from "../../../application/interface/useCases/organizer/events/ICreateEventUseCase";
import { IDeleteEventUseCase } from "../../../application/interface/useCases/organizer/events/IDeleteEventUseCase";
import { IUpdateEventUseCase } from "../../../application/interface/useCases/organizer/events/IEditEventUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { EventCreationRequestDTO } from "../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class EventManagementController {
  constructor(
       private _createEventUseCase: ICreateEventUseCase,
       private _updateEventUseCase: IUpdateEventUseCase,
       private _deleteEventUseCase: IDeleteEventUseCase
  ){}

  async createEvent(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
     try{
           const dto: EventCreationRequestDTO = req.body;
           if(!dto) throw new CustomError("Event Details is required", HttpStatusCode.BAD_REQUEST);

          const eventData =  await this._createEventUseCase.execute(dto);

      res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Event created successfully", HttpStatusCode.CREATED, eventData));

     }catch(err){
         next(err)
     }
   
  }

  async editEvent(req: Request, res: Response, next: NextFunction) :  Promise<void> {
     try{
        const eventId  =  req.params.id;
        if(!eventId) throw new CustomError("EventId is required", HttpStatusCode.BAD_REQUEST);

         const dto = req.body;
         const updatedEvent  = await this._updateEventUseCase.execute(eventId, dto);

   res.status(HttpStatusCode.OK).json(ApiResponse.success("Event updated successfully", HttpStatusCode.OK, updatedEvent));

     }catch(err){
       next(err)
     }
      
}

async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
     const { eventId}  = req.params;
       if(!eventId) throw new CustomError("EventId is required", HttpStatusCode.BAD_REQUEST);

       const  result = await this._deleteEventUseCase.execute(eventId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success("Event deleted successfully", HttpStatusCode.OK, result))

  }catch(err){
     next(err)
  }
     
}
}