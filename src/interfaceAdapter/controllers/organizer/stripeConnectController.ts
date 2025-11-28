import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ICreateStripeAccountUseCase } from "../../../application/interface/useCases/admin/stripe-account/ICreateStripeAccountUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class StripeConnectController {
  constructor(
           private _createStripeAccountUseCase: ICreateStripeAccountUseCase
  ){}

async onBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
      const {organizerId, email} = req.body;
      
        if(!organizerId || !email) throw new CustomError("OrganizerId and email is required", HttpStatusCode.BAD_REQUEST);

       const onBoardingUrl = await this._createStripeAccountUseCase.execute(organizerId, email);
    res.status(HttpStatusCode.CREATED).json(ApiResponse.success("Onboarding url created successfully", HttpStatusCode.CREATED,{onBoardingUrl}));
        

  }catch(err){
     next(err)
  }
}
}