import { NextFunction, Response } from 'express';
import { IAdminActionTakenUseCase } from '../../../application/interface/useCases/common/report/admin/IAdminActionTakenUseCase';
import { IGetReportsUseCase } from '../../../application/interface/useCases/common/report/admin/IGetReportUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { ReportTypes } from '../../../domain/enums/common/report';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { NotFoundError } from '../../../domain/errors/common';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { AdminActionDTO } from '../../../application/DTOs/common/report/AdminReportActionDTO';

export class AdminReportController {
  constructor(
    private _getReportUseCase: IGetReportsUseCase,
    private _adminActionsUseCase: IAdminActionTakenUseCase
  ) {}

  async fetchReports(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { targetType } = req.params;
      const { page, limit } = req.query;

      const data = await this._getReportUseCase.execute(
        targetType as ReportTypes,
        page as string,
        limit as string
      );
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REPORT.REPORTS_FETCH_SUCCESS,
            data
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
      next(err);
    }
  }
  async takeAction(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: AdminActionDTO = req.body;
      const result = await this._adminActionsUseCase.execute(dto);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.REPORT.REPORT_UPDATE_SUCCESS,
            result
          )
        );
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
      next(err);
    }
  }
}
