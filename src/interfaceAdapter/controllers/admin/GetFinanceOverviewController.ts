import { NextFunction, Response } from "express";
import { IGetFinanceOverviewUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetFinanceOverviewUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { FinanceOverviewFilter } from "../../../domain/interface/admin-finance-query/finance";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { TransactionsFilter } from "../../../domain/interface/admin-finance-query/transactions";
import { IGetTransactionsUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetTransactionsUseCase";
import { IGetRefundsUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetRefundsUseCase";
import { IGetRefundOverviewUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetRefundOverviewUseCase";
import { RefundsFilter } from "../../../domain/interface/admin-finance-query/refund";
import { IGetPayoutUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetPayoutUseCase";
import { IGetPayoutOverviewUseCase } from "../../../application/interface/useCases/admin/finance-payout/IGetPayoutOverviewUseCase";
import { PayoutsFilter } from "../../../domain/interface/admin-finance-query/payout";

export class GetFinanceAndPayoutController {
  constructor(
     private readonly _getFinanceOverviewUseCase : IGetFinanceOverviewUseCase,
     private readonly _getTransactionsUseCase : IGetTransactionsUseCase,
     private readonly _getRefundsUseCase : IGetRefundsUseCase,
     private readonly _getRefundOverviewUseCase : IGetRefundOverviewUseCase,
     private readonly _getPayoutsUseCase : IGetPayoutUseCase,
     private readonly _getPayoutsOverviewUseCase :IGetPayoutOverviewUseCase
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
     
     const result = await this._getTransactionsUseCase.execute(filter);
   res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_TRANSACTIONS_SUCCESS, HttpStatusCode.OK, result));

  }catch(err){
     next(err);
  }
}
async getRefunds(req:IAuthenticatedRequest, res : Response, next: NextFunction) : Promise<void> {
  try{
    const filter = req.validatedQuery as RefundsFilter;
   
       const result = await this._getRefundsUseCase.execute(filter);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_REFUND_SUCCESS, HttpStatusCode.OK, result));

  }catch(err){
    next(err)
  }
}
async getRefundsOverview(req: IAuthenticatedRequest, res :Response, next :NextFunction) : Promise<void> {
   try{
         const filter = req.validatedQuery as RefundsFilter;
        
         const result = await this._getRefundOverviewUseCase.execute(filter);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_REFUND_OVERVIEW_SUCCESS, HttpStatusCode.OK, result));
   }catch(err){
     next(err)
   }
}
async getPayouts(req:IAuthenticatedRequest, res : Response, next: NextFunction) : Promise<void> {
  try{
    console.log("filter is" ,req.query)
    const filter = req.validatedQuery as PayoutsFilter;
   
       const result = await this._getPayoutsUseCase.execute(filter);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_PAYOUTS_SUCCESS, HttpStatusCode.OK, result));

  }catch(err){
    next(err)
  }
}
async getPayoutsOverview(req: IAuthenticatedRequest, res :Response, next :NextFunction) : Promise<void> {
   try{
         const filter = req.validatedQuery as FinanceOverviewFilter;
        
         const result = await this._getPayoutsOverviewUseCase.execute(filter);
     res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.FINANCE_PAYOUT.FETCH_PAYOUTS_OVERVIEW_SUCCESS, HttpStatusCode.OK, result));
   }catch(err){
     next(err)
   }
}

}