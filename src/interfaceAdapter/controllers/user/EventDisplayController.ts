import { NextFunction, Request, Response } from "express";
import { IGetTrendingEventUseCase } from "../../../application/interface/useCases/user/event-display/IGetTrendingEventsUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { IGetFeaturedEventUseCase } from "../../../application/interface/useCases/user/event-display/IGetFeaturedEventsUseCase";

export class EventDisplayController {
   constructor(
    private readonly  _getTrendingEventsUseCase: IGetTrendingEventUseCase,
    private readonly  _getFeaturedEventUseCase: IGetFeaturedEventUseCase

  ){}
  
  async getTrending(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
     try{
            const events = await this._getTrendingEventsUseCase.execute();
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.TRENDING_FETCH_SUCCESS, HttpStatusCode.OK,events));

     }catch(err){
        next(err)
     }
  }
  async getFeatured(req: Request,res: Response, next: NextFunction) : Promise<void> {
      try{
          const  events = await this._getFeaturedEventUseCase.execute();
          console.log("events--fff",  events)
          res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.FEATURED_FETCH_SUCCESS, HttpStatusCode.OK,  events))
      }catch(err){
          next(err)
      }
  }
}