import { NextFunction, Response } from 'express';
import { IFetchTicketingUseCase } from '../../../application/interface/useCases/organizer/eventTicketing/IFetchTicketingUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { IFetchTicketingDetailsByEventUseCase } from '../../../application/interface/useCases/organizer/eventTicketing/IFetchTicketingByEventUseCase';
import { NotFoundError } from '../../../domain/errors/common';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class TicketingRetrievalController {
  constructor(
    private _fetchTicketingUseCase: IFetchTicketingUseCase,
    private _fetchTicketingByEventUseCase: IFetchTicketingDetailsByEventUseCase
  ) {}

  async fetchTicketingDetails(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ticketingId } = req.params;
      if (!ticketingId)
        throw new CustomError(
          ErrorMessages.TICKETING.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const fetchedDetails =
        await this._fetchTicketingUseCase.execute(ticketingId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.TICKETING.TICKETING_FETCH_SUCCESS,
            HttpStatusCode.OK,
            fetchedDetails
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async fetchTicketingDetailsByEvent(
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

      const fetchedData =
        await this._fetchTicketingByEventUseCase.execute(eventId);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.TICKETING.TICKETING_FETCH_SUCCESS,
            HttpStatusCode.OK,
            fetchedData
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
      }
      next(err);
    }
  }
}
