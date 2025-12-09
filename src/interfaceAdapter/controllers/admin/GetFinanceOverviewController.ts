import { NextFunction, Response } from "express";
import { IGetFinanceOverviewUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetFinanceOverviewUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { FinanceOverviewFilter } from "../../../domain/interface/admin-finance-query/finance";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { TransactionsFilter } from "../../../domain/interface/admin-finance-query/transactions";
import { IGetTransactionsUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetTransactionsUseCase";

export class GetFinanceAndPayoutController {
  constructor(
     private readonly _getFinanceOverviewUseCase : IGetFinanceOverviewUseCase,
     private readonly _getTransactionsUseCase : IGetTransactionsUseCase
  ){}
async getOverView(req: IAuthenticatedRequest, res: Response, next :NextFunction) : Promise<void> {
  try{
        const filter  = req.validatedQuery as FinanceOverviewFilter;
       
       const data = await this._getFinanceOverviewUseCase.execute(filter);
      
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_SUCCESS,HttpStatusCode.OK, data));
    
  }catch(err){
    next(err)
  }
}

async getTransactions(req: IAuthenticatedRequest, res: Response, next :NextFunction) : Promise<void> {
  try{
     const filter  = req.validatedQuery as TransactionsFilter;
     console.log("filter is", filter)
     const result = await this._getTransactionsUseCase.execute(filter);
   res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_TRANSACTIONS_SUCCESS, HttpStatusCode.OK, result));

  }catch(err){
     next(err);
  }
}
}