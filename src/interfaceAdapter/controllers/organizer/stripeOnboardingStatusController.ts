import { NextFunction, Response } from 'express';
import { IVerifyStripeOnboardingStatusUseCase } from '../../../application/interface/useCases/organizer/stripe-account/IVerifyStripeOnboardingStatusUseCase';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { ApiResponse } from '../../../infrastructure/commonResponseModel/ApiResponse';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ResponseMessages } from '../../../infrastructure/constants/responseMessages';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';

export class StripeOnboardingStatusController {
  constructor(
    private _verifyOnboardingStatus: IVerifyStripeOnboardingStatusUseCase
  ) {}
  async verify(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { stripeAccountId } = req.body;
       const userId = req.user?.id;
      if (!userId)
        throw new CustomError(
          ErrorMessages.USER.ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      if (!stripeAccountId)
        throw new CustomError(
          ErrorMessages.STRIPE_ACCOUNT.ACCOUNT_ID_REQUIRED,
          HttpStatusCode.BAD_REQUEST
        );
      const result =
        await this._verifyOnboardingStatus.execute(userId,stripeAccountId);
      res
        .status(HttpStatusCode.OK)
        .json(
          ApiResponse.success(
            ResponseMessages.STRIP_CONNECT
              .ON_BOARDING_STATUS_VERIFICATION_SUCCESS,
            { verified: result }
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
