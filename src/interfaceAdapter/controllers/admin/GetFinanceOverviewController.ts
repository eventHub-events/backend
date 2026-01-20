import { NextFunction, Response } from 'express';
import { IGetFinanceOverviewUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetFinanceOverviewUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { FinanceOverviewFilter } from '../../../domain/interface/admin-finance-query/finance';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { TransactionsFilter } from '../../../domain/interface/admin-finance-query/transactions';
import { IGetTransactionsUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetTransactionsUseCase';
import { IGetRefundsUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetRefundsUseCase';
import { IGetRefundOverviewUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetRefundOverviewUseCase';
import { RefundsFilter } from '../../../domain/interface/admin-finance-query/refund';
import { IGetPayoutUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetPayoutUseCase';
import { IGetPayoutOverviewUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetPayoutOverviewUseCase';
import { PayoutsFilter } from '../../../domain/interface/admin-finance-query/payout';
import { IGetEventRevenueSummaryUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetEventRevenueSummaryUseCase';
import { EventRevenueFilter } from '../../../domain/interface/admin-finance-query/eventRevenue';
import { IGetSubscriptionPlansUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetSubscriptionUseCase';
import { IGetSubscriptionOverviewUseCase } from '../../../application/interface/useCases/admin/finance-payout/IGetSubscriptionOverviewUseCase';
import {
  SubscriptionOverviewFilter,
  SubscriptionPlansFilter,
} from '../../../domain/interface/admin-finance-query/subcription';

export class GetFinanceAndPayoutController {
  constructor(
    private readonly _getFinanceOverviewUseCase: IGetFinanceOverviewUseCase,
    private readonly _getTransactionsUseCase: IGetTransactionsUseCase,
    private readonly _getRefundsUseCase: IGetRefundsUseCase,
    private readonly _getRefundOverviewUseCase: IGetRefundOverviewUseCase,
    private readonly _getPayoutsUseCase: IGetPayoutUseCase,
    private readonly _getPayoutsOverviewUseCase: IGetPayoutOverviewUseCase,
    private readonly _getEventSummary: IGetEventRevenueSummaryUseCase,
    private readonly _getSubscriptionPlansUseCase: IGetSubscriptionPlansUseCase,
    private readonly _getSubscriptionOverviewUseCase: IGetSubscriptionOverviewUseCase
  ) {}
  async getOverView(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as FinanceOverviewFilter;

      const data = await this._getFinanceOverviewUseCase.execute(filter);

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_SUCCESS,
            data
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async getTransactions(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as TransactionsFilter;

      const result = await this._getTransactionsUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_TRANSACTIONS_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getRefunds(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as RefundsFilter;

      const result = await this._getRefundsUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_REFUND_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getRefundsOverview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as RefundsFilter;

      const result = await this._getRefundOverviewUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_REFUND_OVERVIEW_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getPayouts(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as PayoutsFilter;

      const result = await this._getPayoutsUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_PAYOUTS_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getPayoutsOverview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as FinanceOverviewFilter;

      const result = await this._getPayoutsOverviewUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_PAYOUTS_OVERVIEW_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getSubscriptions(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as SubscriptionPlansFilter;

      const result = await this._getSubscriptionPlansUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT
              .FETCH_SUBSCRIPTION_PLAN_REVENUE_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getSubscriptionsOverview(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
      const filter = req.validatedQuery as SubscriptionOverviewFilter;

      const result = await this._getSubscriptionOverviewUseCase.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT
              .FETCH_SUBSCRIPTION_PLAN_OVERVIEW_DETAILS_SUCCESSFULLY,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getEventRevenueSummary(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.validatedQuery as EventRevenueFilter;

      const result = await this._getEventSummary.execute(filter);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.FINANCE_PAYOUT.FETCH_EVENT_REVENUE_SUMMARY_SUCCESS,
            result
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
