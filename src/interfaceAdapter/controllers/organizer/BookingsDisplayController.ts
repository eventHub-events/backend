import { NextFunction, Request, Response } from "express";
import { IGetAllBookingsUseCase } from "../../../application/interface/useCases/organizer/booking/IGetAllBooking";
import { BookingStatus } from "../../../domain/enums/user/Booking";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export  class BookingsDisplayController {
 constructor (
      private _getAllBookingUseCase : IGetAllBookingsUseCase,
      
 ){}

  async fetchAllBookings(req: Request ,res :Response , next :NextFunction) : Promise<void> {
    try{
        
       const statusValue = req.query.status as string;
       const validStatus = statusValue ? (Object.values(BookingStatus).includes(statusValue as BookingStatus) 
       ? (statusValue as BookingStatus) 
       : undefined) 
       : undefined;

        const filters = {
             title: req.query.title as string,
             userName: req.query.userName as string,
             startDate: req.query.startDate as string,
             status: validStatus,
             endDate : req.query.endDate as string,
             page: req.query.page? parseInt(req.query.page as string,10): 1,
             limit: req.query.limit? parseInt(req.query.limit as string,10):10
        }
        const{mappedBookings: bookings, totalPages} = await this._getAllBookingUseCase.execute(filters);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK, {bookings, totalPages}))
       
    }catch(err){
       next(err)
    }
  }
}