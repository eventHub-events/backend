import { NextFunction, Request, Response } from "express";
import { IGetAllBookingsForAdminUseCase } from "../../../application/interface/useCases/admin/bookings/IGetAllBookingsForAdminUseCase";
import { BookingStatus } from "../../../domain/enums/user/Booking";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { IGetUserBookingByIdForAdminUseCase } from "../../../application/interface/useCases/admin/bookings/IGetBookingByIdForAdminUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";


export class BookingControllerForAdmin {
   constructor(
       private  _getAllBookingForAdminUseCase : IGetAllBookingsForAdminUseCase,
       private  _getBookingById: IGetUserBookingByIdForAdminUseCase
   ) {}

 async fetchBookings(req: Request, res: Response , next: NextFunction) : Promise<void> {
   try{
        
       const statusValue = req.query.status as string ;
       const validStatus = statusValue?(Object.values(BookingStatus).includes(statusValue as BookingStatus)
                            ?(statusValue as BookingStatus)
                             : undefined)
                             : undefined;
         const filters = {
                 title : req.query.eventTitle as string,
                 userName : req.query.userName as string,
                 startDate : req.query.startDate as string,
                 organizerName: req.query.organizerName as string,
                 status : validStatus,
                 endDate : req.query.endDate as string,
                 page : req.query.page? parseInt(req.query.page as string,10) :1,
                 limit : req.query.limit? parseInt(req.query.limit as string,10) :10
             }
             console.log("filters",filters)
         
           const{mappedBookings: bookings, totalPages} = await this._getAllBookingForAdminUseCase.execute(filters);
        res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK,{bookings,totalPages}));

   }catch(err){
      next(err)
   }
 }
 async fetchBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
     try{
            const{ bookingId} = req.params;
                      console.log("bookingId is", bookingId)
                      if(!bookingId) throw new CustomError("BookingId is required", HttpStatusCode.BAD_REQUEST);
                   
                      const booking =await this._getBookingById.execute(bookingId);
                    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK,booking));
     }catch(err){
        next(err)
     }
 }
}