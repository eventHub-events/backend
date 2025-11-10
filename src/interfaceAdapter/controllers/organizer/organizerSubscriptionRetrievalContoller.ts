import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { IFetchSubscriptionByIdUseCase } from "../../../application/interface/useCases/organizer/subscription/IFetchSubscriptionByIdUseCase";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class OrganizerSubscriptionRetrievalController {

         constructor(
               private _fetchSubscriptionByIdUseCase : IFetchSubscriptionByIdUseCase
           ){}
    async fetchSubscription(req: IAuthenticatedRequest, res: Response, next: NextFunction) :Promise<void> {
         
       try{ 
         const { organizerId} = req.params;
          if(!organizerId) throw new CustomError("organizerId is required", HttpStatusCode.BAD_REQUEST);

        const result = await this._fetchSubscriptionByIdUseCase.execute(organizerId);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("plan fetched successfully", HttpStatusCode.OK, result));
          
       }catch(err){
          next(err)
       }
    }
}