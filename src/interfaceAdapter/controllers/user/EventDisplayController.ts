import { NextFunction, Request, Response } from "express";
import { IGetTrendingEventUseCase } from "../../../application/interface/useCases/user/event-display/IGetTrendingEventsUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { IGetFeaturedEventUseCase } from "../../../application/interface/useCases/user/event-display/IGetFeaturedEventsUseCase";
import { IGetEventDetailsUseCase } from "../../../application/interface/useCases/user/event-display/IGetEventDetailsUseCase";
import { IGetAllFeaturedEventUseCase } from "../../../application/interface/useCases/user/event-display/IGetAllFeaturedEventUseCase";
import { ISearchEventsUseCase } from "../../../application/interface/useCases/user/event-display/ISearchEventsUseCase";
import { EventSearchFilterDTO } from "../../../application/DTOs/user/eventSearch/EventSearchFilterDTO";

export class EventDisplayController {
   constructor(
    private readonly  _getTrendingEventsUseCase: IGetTrendingEventUseCase,
    private readonly  _getFeaturedEventUseCase: IGetFeaturedEventUseCase,
    private readonly  _getEventDetailsUseCase: IGetEventDetailsUseCase,
    private readonly  _getAllFeaturedEventUseCase: IGetAllFeaturedEventUseCase,
    private readonly  _searchEventsUseCase : ISearchEventsUseCase

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
          
          res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.FEATURED_FETCH_SUCCESS, HttpStatusCode.OK,  events));
      }catch(err){
          next(err)
      }
     }
     async getAllFeatured(req: Request, res: Response, next: NextFunction) : Promise<void> {
         try{ 
             const filters = {
                 title: req.query.title as string,
                 location: req.query.location as string,
                 category: req.query.category as string,
                 page: req.query.page? parseInt(req.query.page as string,10) :1,
                 limit: req.query.limit? parseInt(req.query.limit as string,10): 10
             }
             const result = await this._getAllFeaturedEventUseCase.execute(filters);
         res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.FEATURED_FETCH_SUCCESS, HttpStatusCode.OK, result))
            
         }catch(err){
            next(err)
         }
     }
    
    async getEventDetailsById( req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try{
              const{ eventId }  = req.params;
              console.log("eventId", eventId)
            const eventDetails = await this._getEventDetailsUseCase.execute(eventId);
            
        res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.EVENT_DETAILS_FETCH_SUCCESS, HttpStatusCode.OK,eventDetails));
        }catch(err) {
            next(err)
        }
    }
    async getEventsForGeneralSearch(req: Request, res :Response, next: NextFunction): Promise<void> {
        try{     
                 const dto = req.validatedQuery as EventSearchFilterDTO;
                 console.log("dto is", dto)
               const result = await this._searchEventsUseCase.execute(dto);
         res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.EVENT.EVENTS_FETCH_SUCCESS, HttpStatusCode.OK, result))
        }catch(err){
            next(err)
        }
    }
    
}