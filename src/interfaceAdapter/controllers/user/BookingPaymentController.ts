import { NextFunction, Request, Response } from "express";
import { ICreateTicketPaymentUseCase } from "../../../application/interface/useCases/user/payment/ICreatetTicketPaymentUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class BookingPaymentController {
    constructor(
         private _createPaymentSessionUseCase : ICreateTicketPaymentUseCase
    ){}
  async createSession(req: Request, res: Response, next: NextFunction) :Promise<void> {
      try{
          const {bookingId}  = req.body;
         
          if(!bookingId) throw new CustomError("Booking id is required", HttpStatusCode.BAD_REQUEST);
         
          const url = await this._createPaymentSessionUseCase.execute(bookingId);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Payment session created", HttpStatusCode.OK,{url}));
         
      }catch(err){
        next(err)
      }
  }
}