import { NextFunction, Response } from "express";
import { IFetchTicketingUseCase } from "../../../application/interface/useCases/organizer/eventTicketing/IFetchTicketingUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export  class TicketingRetrievalController  {
  constructor(
      private _fetchTicketingUseCase : IFetchTicketingUseCase,
  ){}

  async fetchTicketingDetails(req: IAuthenticatedRequest, res: Response , next: NextFunction) : Promise<void> {
    try{
       const{ticketingId} = req.params;
       if(!ticketingId) throw new CustomError("TicketingId is required", HttpStatusCode.BAD_REQUEST);

       const fetchedDetails = await this._fetchTicketingUseCase.execute(ticketingId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success("Ticketing details fetched successfully", HttpStatusCode.OK, fetchedDetails));

    }catch(err){
       next(err)
    }
  }
}