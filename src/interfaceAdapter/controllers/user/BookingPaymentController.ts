import { NextFunction, Request, Response } from "express";
import { ICreateTicketPaymentUseCase } from "../../../application/interface/useCases/user/payment/ICreatetTicketPaymentUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class BookingPaymentController {
    constructor(
         private _createPaymentSessionUseCase : ICreateTicketPaymentUseCase
    ){}
  async createSession(req: Request, res: Response, next: NextFunction) :Promise<void> {
      try{
          const {bookingId}  = req.body;
         
          if(!bookingId) throw new CustomError(ErrorMessages.BOOKING.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
         
          const url = await this._createPaymentSessionUseCase.execute(bookingId);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.BOOKING.PAYMENT_SESSION, HttpStatusCode.OK,{url}));
         
      }catch(err){
        next(err)
      }
  }
}