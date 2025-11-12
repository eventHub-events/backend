import { NextFunction, Request, Response } from "express";
import { IVerifyStripeOnboardingStatusUseCase } from "../../../application/interface/useCases/organizer/stripe-account/IVerifyStripeOnboardingStatusUseCase";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class StripeOnboardingStatusController {
  constructor(
       private _verifyOnboardingStatus: IVerifyStripeOnboardingStatusUseCase
  ){}
  async verify(req: Request, res: Response, next: NextFunction) : Promise<void> {
     try{
          const { organizerId } = req.body;
          console.log("hello organizerId", organizerId)
         if(!organizerId) throw new CustomError("organizerId is required", HttpStatusCode.BAD_REQUEST);
         const result=  await this._verifyOnboardingStatus.execute(organizerId);
       res.status(HttpStatusCode.OK).json(ApiResponse.success("Onboarding Status verified successfully", HttpStatusCode.OK,{verified: result}));
       
     }catch(err){
       next(err)
     }
  }
}