import { NextFunction, Request, Response } from "express";
import { IGetUserBookingListUseCase } from "../../../application/interface/useCases/user/booking/IGetUserBookingListUseCase";
import { NotFoundError } from "../../../domain/errors/common";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { BookingStatus } from "../../../domain/enums/user/Booking";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class GetUserBookingsController  {

  constructor(
      private _getUserBookingsListUseCase : IGetUserBookingListUseCase
  ){}

async getUserBookings(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try{
           const{ userId } = req.params;
           console.log("userid ",userId)
             
             const statusValue = req.query.status as string;
                   const validStatus = statusValue ? (Object.values(BookingStatus).includes(statusValue as BookingStatus) 
                   ? (statusValue as BookingStatus) 
                   : undefined) 
                   : undefined;
           
          const filters = {
                    title: req.query.title as string,
                    organizerName : req.query.organizerName as string,
                    status: validStatus,
                    startDate: req.query.startDate as string,
                    endDate: req.query.endDate as string,
                    page: req.query.page? parseInt(req.query.page as string, 10): 1,
                    limit : req.query.limit? parseInt(req.query.limit as string, 10): 10
                  
               }
         const{ bookingsList, totalPages}  = await this._getUserBookingsListUseCase.execute({userId, ...filters});
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK, {bookingsList, totalPages}));
        
    }catch(err){
        if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
        next(err)
        
    }
}
}