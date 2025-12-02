import { NextFunction, Request, Response } from "express";
import { IGetAllBookingsUseCase } from "../../../application/interface/useCases/organizer/booking/IGetAllBooking";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { IGetBookingDetailsByIdUseCase } from "../../../application/interface/useCases/organizer/booking/IGetBookingDetailsByIdUseCase";
import {  BookingQueryFilter } from "../../../infrastructure/validation/schemas/organizer/bookingQuerySchema";
import { ErrorMessages } from "../../../constants/errorMessages";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { IGetAllBookingsByEventIdUseCase } from "../../../application/interface/useCases/organizer/booking/IGetAllBookingsByEventIdUseCase";


export  class BookingsDisplayController {
 constructor (
      private _getAllBookingUseCase : IGetAllBookingsUseCase,
      private _getBookingDetailsById : IGetBookingDetailsByIdUseCase,
      private _getBookingsByEventIdUseCase : IGetAllBookingsByEventIdUseCase
      
 ){}

  async fetchAllBookings(req: Request ,res :Response , next :NextFunction) : Promise<void> {
    try{
         
      const {organizerId } =  req.params;
        if(!organizerId) throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
        
         const filters = req.validatedQuery as BookingQueryFilter;
         
        const{mappedBookings: bookings, totalPages} = await this._getAllBookingUseCase.execute({organizerId,...filters});
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK, {bookings, totalPages}));
       
    }catch(err){
       next(err)
    }
  }
 async fetchBookingDetailsById(req: Request, res :Response , next :NextFunction) :Promise<void> {

    try{
         const {bookingId} = req.params;
         if(!bookingId) throw new CustomError(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_FAILURE, HttpStatusCode.BAD_REQUEST);
       
        const bookingDetails = await this._getBookingDetailsById.execute(bookingId);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK, bookingDetails));
    }catch(err) {
       next(err)
    }
 }
 async fetchBookingsByEventId(req: IAuthenticatedRequest, res :Response, next :NextFunction) :Promise<void> {
   try{
          const{ eventId } = req.params;
          if(!eventId) throw new CustomError(ErrorMessages.EVENT.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
         const filters = req.validatedQuery as BookingQueryFilter;

        const{mappedBookings: bookings, totalPages} = await this._getBookingsByEventIdUseCase.execute({eventId,...filters});
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK, {bookings, totalPages}));
       
         
   }catch(err){
      next(err)
   }
 }
}