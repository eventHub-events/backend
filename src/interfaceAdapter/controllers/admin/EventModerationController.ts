import { NextFunction, Response } from 'express';
import { ICreateEventModerationUseCase } from '../../../application/interface/useCases/admin/event-management/ICreateEventModerationUseCase';
import { IFetchModerationByEventIdUseCase } from '../../../application/interface/useCases/admin/event-management/IFetchModerationByEventIdUseCase';
import { IUpdateEventModerationUseCase } from '../../../application/interface/useCases/admin/event-management/IUpdateEventModerationUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { EventModerationRequestDTO } from '../../../application/DTOs/admin/EventModeration/EventModerationReqDTO';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { EventModerationUpdateDTO } from '../../../application/DTOs/admin/EventModeration/EventModerationUpdateDTO';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { ErrorMessages } from '../../../constants/errorMessages';

export class EventModerationController {
  constructor(
    private _createModerationUseCase: ICreateEventModerationUseCase,
    private _updateModerationUseCase: IUpdateEventModerationUseCase,
    private _fetchModerationByEventIdUseCase: IFetchModerationByEventIdUseCase
  ) {}

  async create(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: EventModerationRequestDTO = req.body;

      if (!dto)
        throw new CustomError(
          ErrorMessages.EVENT_MODERATION.EVENT_MODERATION_DETAILS_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result = await this._createModerationUseCase.execute(dto);
      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT_MODERATION.EVENT_MODERATION_CREATION_SUCCESS,
            HttpStatusCode.CREATED,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async update(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;

      if (!eventId)
        throw new CustomError(
          ErrorMessages.EVENT_MODERATION.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const dto: EventModerationUpdateDTO = req.body;
      if (!dto)
        throw new CustomError(
          ErrorMessages.EVENT_MODERATION
            .EVENT_MODERATION_UPDATE_DETAILS_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result = await this._updateModerationUseCase.execute(eventId, dto);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT_MODERATION.EVENT_MODERATION_UPDATE_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async fetchDetailsByEvent(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      if (!eventId)
        throw new CustomError(
          ErrorMessages.EVENT.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result =
        await this._fetchModerationByEventIdUseCase.execute(eventId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT_MODERATION.EVENT_MODERATION_FETCH_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
