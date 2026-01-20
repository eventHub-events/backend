import { NextFunction, Request, Response } from 'express';
import { IBookTicketUseCase } from '../../../application/interface/useCases/user/booking/IBookTicketUseCase';
import { BookingRequestDTO } from '../../../application/DTOs/user/booking/BookingRequestDTO';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { ICancelPaidBookingUseCase } from '../../../application/interface/useCases/user/booking/ICancelPaidBookingUseCase';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { ErrorMessages } from '../../../constants/errorMessages';
import { BadRequestError } from '../../../domain/errors/common';

export class EventBookingController {
  constructor(
    private _bookTicketUseCase: IBookTicketUseCase,
    private _cancelPaidBookingUseCase: ICancelPaidBookingUseCase
  ) {}

  async bookTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      const dto: BookingRequestDTO = req.body;

      const bookingDetails = await this._bookTicketUseCase.execute(
        eventId,
        dto
      );

      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.BOOKING.BOOKING_SUCCESS,
            bookingDetails
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async cancelPaidBooking(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookingId } = req.params;
      const userId = req.user?.id;
      if (!userId)
        throw new CustomError(
          ErrorMessages.USER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      await this._cancelPaidBookingUseCase.execute(userId!, bookingId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(ResponseMessages.BOOKING.BOOKING_CANCEL_SUCCESS)
        );
    } catch (err) {
      if (err instanceof BadRequestError)
        throw new CustomError(err.message, HttpStatusCode.BAD_REQUEST);
      next(err);
    }
  }
}
