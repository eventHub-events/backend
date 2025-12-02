import { NextFunction, Request, Response } from "express";
import { IVerifyStripeOnboardingStatusUseCase } from "../../../application/interface/useCases/organizer/stripe-account/IVerifyStripeOnboardingStatusUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class StripeOnboardingStatusController {
  constructor(
       private _verifyOnboardingStatus: IVerifyStripeOnboardingStatusUseCase
  ){}
  async verify(req: Request, res: Response, next: NextFunction) : Promise<void> {
     try{
          const { organizerId } = req.body;
         
         if(!organizerId) throw new CustomError(ErrorMessages.ORGANIZER.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
         const result=  await this._verifyOnboardingStatus.execute(organizerId);
       res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.STRIP_CONNECT.ON_BOARDING_STATUS_VERIFICATION_SUCCESS, HttpStatusCode.OK,{verified: result}));
       
     }catch(err){
       next(err);
     }
  }
}