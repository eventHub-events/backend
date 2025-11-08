import { NextFunction, Request, Response } from "express";
import { IFetchSubscriptionPlansUseCase } from "../../../application/interface/useCases/admin/subscription-plans/IFetchSubscriptionPlansUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { SubscriptionPlans } from "../../../infrastructure/constants/response-messages/admin/subscriptionPlans";

export class SubscriptionPlansRetrievalController  {
  
  constructor(
       private _fetchSubscriptionPlansUseCase : IFetchSubscriptionPlansUseCase
  ){}

async fetchAll(req: Request, res: Response, next: NextFunction) : Promise<void> {

    try{
          const fetched = await this._fetchSubscriptionPlansUseCase.execute();
          console.log("ress", fetched)
         res.status(HttpStatusCode.OK).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLANS_FETCH_SUCCESS, HttpStatusCode.OK, fetched));

    }catch(err){

       next(err);

    }
 }
}