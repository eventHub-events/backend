import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ICreateStripeAccountUseCase } from "../../../application/interface/useCases/admin/stripe-account/ICreateStripeAccountUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class StripeConnectController {
  constructor(
           private _createStripeAccountUseCase: ICreateStripeAccountUseCase
  ){}

async onBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
      const {organizerId, email} = req.body;
      
        if(!organizerId || !email) throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);

       const onBoardingUrl = await this._createStripeAccountUseCase.execute(organizerId, email);
    res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.STRIP_CONNECT.ON_BOARDING_URL_SUCCESS, HttpStatusCode.CREATED,{onBoardingUrl}));
        

  }catch(err){
     next(err)
  }
}
}