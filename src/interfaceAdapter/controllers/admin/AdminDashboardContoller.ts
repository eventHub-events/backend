import { NextFunction, Response } from 'express';
import { IAdminDashboardUseCase } from '../../../application/interface/useCases/admin/dashboard/IAdminDashboardUseCase';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { ReportRange } from '../../../infrastructure/types/dashboard/booking';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';

export class AdminDashBoardController {
  constructor(private readonly _dashboardUseCase: IAdminDashboardUseCase) {}

  async getDashboard(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { range } = req.query;
      const dashboardData = await this._dashboardUseCase.execute(
        range as ReportRange
      );
      console.log(dashboardData);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.ADMIN_DASHBOARD.ON_SUCCESS,
            
            dashboardData
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
