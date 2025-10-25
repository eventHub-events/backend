import { NextFunction, Response } from "express";
import { IGetTrendingEventUseCase } from "../../../application/interface/useCases/user/event-dispaly/IGetTrendingEventsUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class EventDisplayController {
   constructor(
    private readonly  _getTrendingEventsUseCase: IGetTrendingEventUseCase

  ){}
  
  async getTrending(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
     try{
          const events = await this._getTrendingEventsUseCase.execute();
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Trending Events fetched successfully"));
     }catch(err){
        next(err)
     }
  }
}