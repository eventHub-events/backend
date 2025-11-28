import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IFetchSubscriptionByIdUseCase } from "../../../application/interface/useCases/organizer/subscription/IFetchSubscriptionByIdUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { IFetchSubscriptionPlansForOrganizerUseCase } from "../../../application/interface/useCases/organizer/subscription/IFetchSubscriptionPlansUseCase";
import { Subscription } from "../../../infrastructure/constants/response-messages/organizer/subscription";
import { NotFoundError } from "../../../domain/errors/common";

export class OrganizerSubscriptionRetrievalController {

         constructor(
               private _fetchSubscriptionByIdUseCase : IFetchSubscriptionByIdUseCase,
               private _fetchAllPlansUseCase : IFetchSubscriptionPlansForOrganizerUseCase
           ){}
    async fetchSubscription(req: IAuthenticatedRequest, res: Response, next: NextFunction) :Promise<void> {
         
       try{ 
         const { organizerId} = req.params;
          if(!organizerId) throw new CustomError("organizerId is required", HttpStatusCode.BAD_REQUEST);

        const result = await this._fetchSubscriptionByIdUseCase.execute(organizerId);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(Subscription.SUBSCRIPTION_SUCCESS, HttpStatusCode.OK, result));
          
       }catch(err){
           if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
          next(err)
       }
    }

   async fetchAllSubscriptionPlans(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
         try{
              const plans = await this._fetchAllPlansUseCase.execute();
            res.status(HttpStatusCode.OK).json(ApiResponse.success(Subscription.SUBSCRIPTION_PLANS_SUCCESS, HttpStatusCode.OK, plans));

         }catch(err){
             if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
            next(err)
         }
   }
}