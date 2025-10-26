import { NextFunction, Response } from "express";
import { IGetTrendingEventUseCase } from "../../../application/interface/useCases/user/event-dispaly/IGetTrendingEventsUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class EventDisplayController {
   constructor(
    private readonly  _getTrendingEventsUseCase: IGetTrendingEventUseCase

  ){}
  
  async getTrending(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
     try{
            const events = await this._getTrendingEventsUseCase.execute();
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.TRENDING_FETCH_SUCCESS, HttpStatusCode.OK,events));
      
     }catch(err){
        next(err)
     }
  }
}