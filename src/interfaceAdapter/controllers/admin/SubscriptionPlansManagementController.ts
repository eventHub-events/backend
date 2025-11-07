import { NextFunction, Request, Response } from "express";
import { ICreateSubscriptionPlanUseCase } from "../../../application/interface/useCases/admin/subscription-plans/ICreateSubscriptionUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CreateSubscriptionRequestRequestDTO } from "../../../application/DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { SubscriptionPlans } from "../../../infrastructure/constants/response-messages/admin/subscriptionPlans";
import { IUpdateSubscriptionPlansUseCase } from "../../../application/interface/useCases/admin/subscription-plans/IUpdateSubscriptionUseCase";
import { UpdateSubscriptionRequestDTO } from "../../../application/DTOs/admin/subscription-plans/UpdateSubscriptionRequestDTO";

export class SubscriptionPlansManagementController {
   constructor(
      private _createSubscriptionUseCase : ICreateSubscriptionPlanUseCase,
      private _updateSubscriptionPlanUseCase : IUpdateSubscriptionPlansUseCase

   ){}

 async create(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
    try{

            const dto: CreateSubscriptionRequestRequestDTO = req.body;
            if(!dto) throw new CustomError("Subscription details required", HttpStatusCode.BAD_REQUEST);

       const result = await this._createSubscriptionUseCase.execute(dto);
     res.status(HttpStatusCode.CREATED).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLAN_SUCCESS, HttpStatusCode.CREATED, result));
     

    }catch(err){

        next(err)
    }
 }
 async update(req: Request, res: Response, next: NextFunction) : Promise<void> {
     try{ 
            const{ subscriptionId }  = req.params;
            if(!subscriptionId) throw new CustomError("Subscription id is required", HttpStatusCode.BAD_REQUEST);

         const dto:UpdateSubscriptionRequestDTO = req.body;
          if(!dto) throw new CustomError(SubscriptionPlans.SUBSCRIPTION_PLANS_UPDATE_FAILURE, HttpStatusCode.BAD_REQUEST);

       const result = await this._updateSubscriptionPlanUseCase.execute(subscriptionId, dto);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLANS_UPDATE_SUCCESS, HttpStatusCode.OK, result));

     }catch(err){
      
         next(err)
     }
 }
}