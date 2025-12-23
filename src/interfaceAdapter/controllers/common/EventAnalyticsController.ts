import { NextFunction, Response } from 'express';
import { IGetEventAnalyticsUseCase } from '../../../application/interface/useCases/common/event-analytics/IGetEventAnalyticsUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { EventAnalyticsFilter } from '../../../domain/interface/event-analytics/eventAnalyticsFilter';
import { NotFoundError } from '../../../domain/errors/common';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { UserRole } from '../../../domain/enums/user/userRoles';

export class EventAnalyticsController {
  constructor(
    private readonly _getEventAnalyticsUseCase: IGetEventAnalyticsUseCase
  ) {}

  async getEventAnalytics(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const organizerId =
        req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;
      const filter = req.validatedQuery as EventAnalyticsFilter;

      const data = await this._getEventAnalyticsUseCase.execute(
        filter,
        organizerId
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.EVENT_ANALYTICS.DETAILS_FETCH_SUCCESS,
            HttpStatusCode.OK,
            data
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
      next(err);
    }
  }
}
