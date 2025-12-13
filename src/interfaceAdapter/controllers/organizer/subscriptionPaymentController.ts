import { NextFunction, Response } from 'express';
import { ICreateSubscriptionCheckoutUseCase } from '../../../application/interface/useCases/organizer/subscription/ICreateSubscriptionCheckoutUseCase';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';

export class SubscriptionPaymentController {
  constructor(
    private _createCheckoutUseCase: ICreateSubscriptionCheckoutUseCase
  ) {}

  async createCheckout(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        planName,
        price,
        planId,
        organizerName,
        organizerEmail,
        durationInDays,
        subscriptionType,
        payoutDelayDays,
        commissionRate,
      } = req.body;
      const organizerId = req.user?.id;

      if (!organizerId)
        throw new CustomError(
          ErrorMessages.ORGANIZER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );

      const checkoutUrl = await this._createCheckoutUseCase.execute({
        planName,
        price,
        organizerId,
        durationInDays,
        organizerName,
        organizerEmail,
        planId,
        subscriptionType,
        payoutDelayDays,
        commissionRate,
      });

      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.ORGANIZER_SUBSCRIPTION
              .CHECKOUT_CREATION_URL_SUCCESS,
            HttpStatusCode.OK,
            checkoutUrl
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
