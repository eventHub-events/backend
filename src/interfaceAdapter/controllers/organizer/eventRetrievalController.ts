import { NextFunction, Response } from "express";
import { IGetAllEventUseCase } from "../../../application/interface/useCases/organizer/events/IGetAllEventUseCase";
import { IGetEventByIdUseCase } from "../../../application/interface/useCases/organizer/events/IGetEventByIdUseCase";
import {  IGetEventByOrganizerUseCase } from "../../../application/interface/useCases/organizer/events/IGetEventByOrganizer";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class EventRetrievalController {
  constructor(
     private  _getByOrganizerIdUseCase : IGetEventByOrganizerUseCase,
     private  _getByIdUseCase :IGetEventByIdUseCase,
     private  _getAllEventsUseCase : IGetAllEventUseCase 
  ){}

  async getEventById(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise< void> {
    try{
           const { eventId } = req.params;
          if(!eventId) throw new CustomError("EventId is required", HttpStatusCode.BAD_REQUEST);

        const event = await this._getByIdUseCase.execute(eventId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success("Event fetched successfully", HttpStatusCode.OK, event));

     }catch(err){
       next(err)
     }
   }
 
  async getEventsByOrganizer(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try{
          const{ organizerId}  = req.params;
         
          if(!organizerId) throw new CustomError("OrganizerId is required", HttpStatusCode.BAD_REQUEST);

          const events = await this._getByOrganizerIdUseCase.execute(organizerId);
          console.log("events ",events)
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Events fetched successfully", HttpStatusCode.OK, events));

      }catch(err){
         next(err)
      }
  }

async getAllEvents(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
     try{
          const events = await this._getAllEventsUseCase.execute();

          res.status(HttpStatusCode.OK).json(ApiResponse.success("All events fetched Successfully", HttpStatusCode.OK, events));
     }catch(err){
       next(err)
     }
}
}