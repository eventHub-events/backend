import { NextFunction, Response } from "express";
import { ICreateTicketingUseCase } from "../../../application/interface/useCases/organizer/eventTicketing/ICreateTicketingUseCase";
import { IUpdateTicketingUseCase } from "../../../application/interface/useCases/organizer/eventTicketing/IEditTicketingUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { EventTicketingRequestDTO } from "../../../application/DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { EventTicketingEditDTO } from "../../../application/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { ErrorMessages } from "../../../constants/errorMessages";


export  class TicketingManagementController {
  constructor(
      private _creatingTicketingUseCase : ICreateTicketingUseCase,
      private _updateTicketingUseCase : IUpdateTicketingUseCase
  ){}
  async create(req: IAuthenticatedRequest, res: Response, next : NextFunction): Promise<void> {
    try{
        const dto: EventTicketingRequestDTO = req.body;
       
        const  createdTicketing = await this._creatingTicketingUseCase.execute(dto);
     res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.TICKETING.TICKETING_CREATION_SUCCESS, HttpStatusCode.CREATED, createdTicketing));

    }catch(err) {
       next(err)  
    }
  }
  async update(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {

    try{  
         const{ eventId } = req.params;
       
           if(!eventId) throw new CustomError(ErrorMessages.TICKETING.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

         const updatedDTO : EventTicketingEditDTO = req.body;
         const updatedTicketing = await this._updateTicketingUseCase.execute(eventId, updatedDTO);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.TICKETING.TICKETING_UPDATE_SUCCESS, HttpStatusCode.OK, updatedTicketing));

    }catch(err){
         next(err);
    }
  }
}