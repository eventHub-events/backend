import { NextFunction, Response } from "express";
import { ICreateTicketingUseCase } from "../../../application/interface/useCases/organizer/eventTicketing/ICreateTicketingUseCase";
import { IUpdateTicketingUseCase } from "../../../application/interface/useCases/organizer/eventTicketing/IEditTicketingUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { EventTicketingRequestDTO } from "../../../domain/DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { EventTicketingEditDTO } from "../../../domain/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";


export  class TicketingManagementController {
  constructor(
      private _creatingTicketingUseCase : ICreateTicketingUseCase,
      private _updateTicketingUseCase : IUpdateTicketingUseCase
  ){}
  async create(req: IAuthenticatedRequest, res: Response, next : NextFunction): Promise<void> {
    try{
        const dto: EventTicketingRequestDTO = req.body;
        console.log("Ticket body", dto)
        const  createdTicketing = await this._creatingTicketingUseCase.execute(dto);
     res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Ticketing details created successfully", HttpStatusCode.CREATED, createdTicketing));

    }catch(err) {
       next(err)  
    }
  }
  async update(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {

    try{  
         const{ eventId } = req.params;
         console.log("hello", eventId)
           if(!eventId) throw new CustomError("ticketingId is required", HttpStatusCode.BAD_REQUEST);

         const updatedDTO : EventTicketingEditDTO = req.body;
         const updatedTicketing = await this._updateTicketingUseCase.execute(eventId, updatedDTO);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Ticketing details updated SuccessFully", HttpStatusCode.OK, updatedTicketing));

    }catch(err){
         next(err);
    }
  }
}