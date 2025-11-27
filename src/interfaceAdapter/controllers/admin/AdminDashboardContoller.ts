import { NextFunction, Request, Response } from "express";
import { IAdminDashboardUseCase } from "../../../application/interface/useCases/admin/dashboard/IAdminDashboardUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export class AdminDashBoardController {
    constructor(
    private readonly dashboardUseCase: IAdminDashboardUseCase
  ) {}

  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
            const dashboardData = await this.dashboardUseCase.execute();

     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.ADMIN_DASHBOARD.ON_SUCCESS, HttpStatusCode.OK, dashboardData));
     
    }catch(err){
       next(err)
    }
  }
}