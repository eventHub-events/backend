import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ICreateStripeAccountUseCase } from '../../../application/interface/useCases/admin/stripe-account/ICreateStripeAccountUseCase';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { IGetStripeAccountsUseCase } from '../../../application/interface/useCases/organizer/stripe-account/IGetStripeAccountsUseCase';

export class StripeConnectController {
  constructor(
    private _createStripeAccountUseCase: ICreateStripeAccountUseCase,
    private _getStripeAccountUseCase: IGetStripeAccountsUseCase
  ) {}

  async onBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { organizerId, email, label } = req.body;

      if (!organizerId || !email)
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const onBoardingUrl = await this._createStripeAccountUseCase.execute(
        organizerId,
        email,
        label
      );
      res
        .status(HttpStatusCode.CREATED)
        .json(
          ApiResponse.success(
            ResponseMessages.STRIP_CONNECT.ON_BOARDING_URL_SUCCESS,
            { onBoardingUrl }
          )
        );
    } catch (err) {
      next(err);
    }
  }
  async getAccounts(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const organizerId = req.params.organizerId;
      console.log('organzierId', typeof organizerId);
      if (!organizerId)
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      const accounts = await this._getStripeAccountUseCase.execute(organizerId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.STRIPE_ACCOUNTS.FETCH_SUCCESS,
            accounts
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
