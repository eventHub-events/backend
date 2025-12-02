import { NextFunction, Request, Response } from "express";
import { IGetAllBookingsForAdminUseCase } from "../../../application/interface/useCases/admin/bookings/IGetAllBookingsForAdminUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { IGetUserBookingByIdForAdminUseCase } from "../../../application/interface/useCases/admin/bookings/IGetBookingByIdForAdminUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { BookingQueryFilter } from "../../../infrastructure/validation/schemas/organizer/bookingQuerySchema";
import { ErrorMessages } from "../../../constants/errorMessages";


export class BookingControllerForAdmin {
   constructor(
       private  _getAllBookingForAdminUseCase : IGetAllBookingsForAdminUseCase,
       private  _getBookingById: IGetUserBookingByIdForAdminUseCase
   ) {}

 async fetchBookings(req: Request, res: Response , next: NextFunction) : Promise<void> {
   try{
        
           const filters = req.validatedQuery as BookingQueryFilter;
         
           const{mappedBookings: bookings, totalPages} = await this._getAllBookingForAdminUseCase.execute(filters);
        res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK,{bookings,totalPages}));

   }catch(err){
      next(err)
   }
 }
 async fetchBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
     try{
            const{ bookingId} = req.params;
                      
                      if(!bookingId) throw new CustomError(ErrorMessages.BOOKING.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
                   
                      const booking =await this._getBookingById.execute(bookingId);
                    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS, HttpStatusCode.OK,booking));
     }catch(err){
        next(err)
     }
 }
}