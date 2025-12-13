import { NextFunction, Request, Response } from 'express';
import { IGetUserBookingListUseCase } from '../../../application/interface/useCases/user/booking/IGetUserBookingListUseCase';
import { NotFoundError } from '../../../domain/errors/common';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IGetUserBookingById } from '../../../application/interface/useCases/user/booking/IGetUserBookingByIdUseCase';
import { IGetBookingBySessionId } from '../../../application/interface/useCases/user/booking/IGetBookingBySessionIdUseCase';
import { ErrorMessages } from '../../../constants/errorMessages';
import { BookingQueryFilter } from '../../../infrastructure/validation/schemas/organizer/bookingQuerySchema';

export class GetUserBookingsController {
  constructor(
    private _getUserBookingsListUseCase: IGetUserBookingListUseCase,
    private _getBookingByIdUseCase: IGetUserBookingById,
    private _getBookingBySessionIdUseCase: IGetBookingBySessionId
  ) {}

  async getUserBookings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
   
      const filters = req.validatedQuery as BookingQueryFilter;
      const { bookingsList, totalPages } =
        await this._getUserBookingsListUseCase.execute({ userId, ...filters });

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS,
            HttpStatusCode.OK,
            { bookingsList, totalPages }
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
      next(err);
    }
  }
  async getBookingById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bookingId } = req.params;

      if (!bookingId)
        throw new CustomError(
          ErrorMessages.BOOKING.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const booking = await this._getBookingByIdUseCase.execute(bookingId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS,
            HttpStatusCode.OK,
            booking
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getBookingBySessionId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sessionId } = req.params;
      if (!sessionId)
        throw new CustomError(
          ErrorMessages.BOOKING.SESSION_ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const booking =
        await this._getBookingBySessionIdUseCase.execute(sessionId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.BOOKING_DETAILS.BOOKING_DETAILS_SUCCESS,
            HttpStatusCode.OK,
            booking
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
