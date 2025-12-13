import { NextFunction, Request, Response } from 'express';
import { ICreateEventUseCase } from '../../../application/interface/useCases/organizer/events/ICreateEventUseCase';
import { IDeleteEventUseCase } from '../../../application/interface/useCases/organizer/events/IDeleteEventUseCase';
import { IUpdateEventUseCase } from '../../../application/interface/useCases/organizer/events/IEditEventUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { EventCreationRequestDTO } from '../../../application/DTOs/organizer/events/EventCreationRequestDTO';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ICancelEventUseCase } from '../../../application/interface/useCases/organizer/events/ICancelEventUseCase';
import { EventUpdateDTO } from '../../../application/DTOs/organizer/events/EventUpdateDTO';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class EventManagementController {
  constructor(
    private _createEventUseCase: ICreateEventUseCase,
    private _updateEventUseCase: IUpdateEventUseCase,
    private _deleteEventUseCase: IDeleteEventUseCase,
    private _cancelEventUseCase: ICancelEventUseCase
  ) {}

  async createEvent(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: EventCreationRequestDTO = req.body;

      if (!dto)
        throw new CustomError(
          ErrorMessages.EVENT.EVENT_DETAILS_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const eventData = await this._createEventUseCase.execute(dto);

      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT.EVENT_CREATION_SUCCESS,
            HttpStatusCode.CREATED,
            eventData
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async editEvent(
    req: Request,
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
      const dto: EventUpdateDTO = req.body;
      const updatedEvent = await this._updateEventUseCase.execute(eventId, dto);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT.EVENT_UPDATE_SUCCESS,
            HttpStatusCode.OK,
            updatedEvent
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;

      if (!eventId)
        throw new CustomError(
          ErrorMessages.EVENT.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const result = await this._deleteEventUseCase.execute(eventId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT.EVENT_DELETE_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async cancel(
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
      const result = await this._cancelEventUseCase.execute(eventId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT.EVENT_CANCEL_SUCCESS,
            HttpStatusCode.OK,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
