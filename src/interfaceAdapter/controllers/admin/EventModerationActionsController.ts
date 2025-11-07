import { NextFunction, Response } from "express";
import { IApproveEventUseCase } from "../../../application/interface/useCases/admin/event-management/IApproveEventUseCase";
import { IBlockEventUseCase } from "../../../application/interface/useCases/admin/event-management/IBlockEventUseCase";
import { IRejectEventUseCase } from "../../../application/interface/useCases/admin/event-management/IRejectEventUseCase";
import { IUnblockEventUseCase } from "../../../application/interface/useCases/admin/event-management/IUnblockEventUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { EventModerationRequestDTO } from "../../../application/DTOs/admin/EventModeration/EventModerationReqDTO";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";

export class EventModerationActionsController {
  constructor(
       private _approveEventUseCase : IApproveEventUseCase,
       private _rejectEventUseCase: IRejectEventUseCase,
       private _blockEventUseCase: IBlockEventUseCase,
       private _unBlockEventUseCase: IUnblockEventUseCase
  ){}

  async approve(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try{
          const{eventId} = req.params;
          const dto: EventModerationRequestDTO = req.body;

          const updatedData =  await  this._approveEventUseCase.execute(eventId, dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details Updated successfully"));
      }catch(err){
        next(err)
      }
  }
  async reject(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try{
          const{eventId} = req.params;
          const dto: EventModerationRequestDTO = req.body;

          const updatedData =  await  this._rejectEventUseCase.execute(eventId, dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details Updated successfully"));
      }catch(err){
        next(err)
      }
  }
  async block(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try{
          const{eventId} = req.params;
          const dto: EventModerationRequestDTO = req.body;

          const updatedData =  await  this._blockEventUseCase.execute(eventId, dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details Updated successfully"));
      }catch(err){
        next(err)
      }
  }
  async unBlock(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try{
          const{eventId} = req.params;
          const dto: EventModerationRequestDTO = req.body;

          const updatedData =  await  this._unBlockEventUseCase.execute(eventId, dto);
      res.status(HttpStatusCode.OK).json(ApiResponse.success("Moderation details Updated successfully"));
      }catch(err){
        next(err)
      }
  }
}