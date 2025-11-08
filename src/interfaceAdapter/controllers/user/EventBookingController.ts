import { NextFunction, Request, Response } from "express";
import { IBookTicketUseCase } from "../../../application/interface/useCases/user/booking/IBookTicketUseCase";
import { BookingRequestDTO } from "../../../application/DTOs/user/booking/BookingRequestDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class EventBookingController {
  constructor(
       private _bookTicketUseCase : IBookTicketUseCase
  ){}

 async bookTickets( req: Request, res: Response, next: NextFunction) :Promise<void> {
   try{
       const  { eventId } = req.params;
       const dto: BookingRequestDTO = req.body;
       console.log("dddd", dto)
       
       const bookingDetails = await this._bookTicketUseCase.execute(eventId, dto);

    res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.BOOKING.BOOKING_SUCCESS, HttpStatusCode.CREATED, bookingDetails));
   }catch(err){
     next(err)
   }
 }
}