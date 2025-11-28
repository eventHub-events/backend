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
import { IUpdateSubscriptionPlanStatusUseCase } from "../../../application/interface/useCases/admin/subscription-plans/IUpdateSubscriptionPlanStatus";

export class SubscriptionPlansManagementController {
   constructor(
      private _createSubscriptionUseCase : ICreateSubscriptionPlanUseCase,
      private _updateSubscriptionPlanUseCase : IUpdateSubscriptionPlansUseCase,
      private _updateStatusUseCase : IUpdateSubscriptionPlanStatusUseCase

   ){}

 async create(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
    try{

            const dto: CreateSubscriptionRequestRequestDTO = req.body;
            if(!dto) throw new CustomError("Subscription details required", HttpStatusCode.BAD_REQUEST);

       const result = await this._createSubscriptionUseCase.execute(dto);
     res.status(HttpStatusCode.CREATED).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLAN_SUCCESS, HttpStatusCode.CREATED, result));
     

    }catch(err){

        next(err);
    }
 }
 async update(req: Request, res: Response, next: NextFunction) : Promise<void> {
     try{ 
            const{ planId }  = req.params;
            if(!planId) throw new CustomError("Subscription id is required", HttpStatusCode.BAD_REQUEST);

         const dto:UpdateSubscriptionRequestDTO = req.body;
          if(!dto) throw new CustomError(SubscriptionPlans.SUBSCRIPTION_PLANS_UPDATE_FAILURE, HttpStatusCode.BAD_REQUEST);

       const result = await this._updateSubscriptionPlanUseCase.execute(planId, dto);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLANS_UPDATE_SUCCESS, HttpStatusCode.OK, result));

     }catch(err){
      
         next(err);
     }
 }
 async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try{
         
           const{ planId }  = req.params;
           const {status } = req.body;
            console.log("plansId", planId)
            console.log("plansId", status)
           if(!planId) throw new CustomError("PlanId is Required", HttpStatusCode.BAD_REQUEST);
           if(!status) throw new CustomError("status is Required", HttpStatusCode.BAD_REQUEST);
         
           const result = await this._updateStatusUseCase.execute(planId,status);
       res.status(HttpStatusCode.OK).json(ApiResponse.success(SubscriptionPlans.SUBSCRIPTION_PLANS_UPDATE_STATUS_SUCCESS, HttpStatusCode.OK, result));

      }catch(err){
          next(err);
      }
 }
}