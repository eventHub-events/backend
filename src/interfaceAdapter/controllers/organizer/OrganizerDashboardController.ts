import { NextFunction, Response } from 'express';
import { IOrganizerDashboardUseCase } from '../../../application/interface/useCases/organizer/dashboard/IOrganizerDashboardUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { ReportRange } from '../../../infrastructure/types/dashboard/booking';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IOrganizerDashboardDetailsUseCase } from '../../../application/interface/useCases/organizer/dashboard/IOrganizerDashboardDetailsUseCase';
import { OrganizerDashboardFilter } from '../../../domain/interface/organizer-dashboard/dashboard';

export class OrganizerDashboardController {
  constructor(
    private _organizerDashboardUseCase: IOrganizerDashboardUseCase,
    private _organizerDashboardDetailsUseCase: IOrganizerDashboardDetailsUseCase
  ) {}
  async getDashboard(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const organizerId = req.user!.id;
      const range = req.query as unknown as ReportRange;

      const data = await this._organizerDashboardUseCase.execute(
        organizerId,
        range
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.ORGANIZER_DASHBOARD.ON_SUCCESS,
            data
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getDashboardDetails(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const organizerId = req.user!.id;

      const filter = req.validatedQuery as OrganizerDashboardFilter;

      const data = await this._organizerDashboardDetailsUseCase.execute(
        organizerId,
        filter
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.ORGANIZER_DASHBOARD.ON_SUCCESS,
            data
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
