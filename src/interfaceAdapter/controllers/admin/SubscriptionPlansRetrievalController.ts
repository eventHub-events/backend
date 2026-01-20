import { NextFunction, Response } from 'express';
import { IFetchSubscriptionPlansUseCase } from '../../../application/interface/useCases/admin/subscription-plans/IFetchSubscriptionPlansUseCase';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { SubscriptionPlans } from '../../../infrastructure/constants/response-messages/admin/subscriptionPlans';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';

export class SubscriptionPlansRetrievalController {
  constructor(
    private _fetchSubscriptionPlansUseCase: IFetchSubscriptionPlansUseCase
  ) {}

  async fetchAll(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fetched = await this._fetchSubscriptionPlansUseCase.execute();

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            SubscriptionPlans.SUBSCRIPTION_PLANS_FETCH_SUCCESS,
            fetched
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
