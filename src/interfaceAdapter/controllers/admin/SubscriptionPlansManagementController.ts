import { NextFunction, Response } from "express";
import { ICreateSubscriptionPlanUseCase } from "../../../application/interface/useCases/admin/subscription-plans/ICreateSubscriptionUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CreateSubscriptionRequestRequestDTO } from "../../../application/DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { SubscriptionPlans } from "../../../infrastructure/constants/response-messages/admin/subscriptionPlans";

export class SubscriptionPlansManagementController {
   constructor(
      private _createSubscriptionUseCase : ICreateSubscriptionPlanUseCase
   ){}

 async create(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
    try{

            const dto: CreateSubscriptionRequestRequestDTO = req.body;
            if(!dto) throw new CustomError("Subscription details required",HttpStatusCode.BAD_REQUEST);

       const result = await this._createSubscriptionUseCase.execute(dto);
     res.status(HttpStatusCode.CREATED).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLAN_SUCCESS, HttpStatusCode.CREATED, result));
     

    }catch(err){
        next(err)
    }
 }
}