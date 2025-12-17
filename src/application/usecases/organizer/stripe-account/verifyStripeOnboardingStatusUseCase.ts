import { ErrorMessages } from '../../../../constants/errorMessages';
import { NotFoundError } from '../../../../domain/errors/common';
import { IOrganizerStripeAccountRepository } from '../../../../domain/repositories/organizer/IOrganizerStripeAccountRepository';

import { IVerifyStripeOnboardingStatusUseCase } from '../../../interface/useCases/organizer/stripe-account/IVerifyStripeOnboardingStatusUseCase';
import { IStripeConnectService } from '../../../service/common/IStripeConnectService';

export class VerifyStripeOnboardingStatusUseCase implements IVerifyStripeOnboardingStatusUseCase {
  constructor(
 
    private _stripeConnectService: IStripeConnectService,
    private _organizerStripeRepo : IOrganizerStripeAccountRepository
  ) {}
  async execute(stripeAccountId: string): Promise<boolean> {
  
     const accountEntity = await this._organizerStripeRepo.getStripeAccountByStripeId(stripeAccountId);

      if (!accountEntity)
      throw new NotFoundError(ErrorMessages.STRIPE.ACCOUNT_NOT_FOUND);

    const account = await this._stripeConnectService.retrieveAccount(
      stripeAccountId
    );
   

    if (account.details_submitted && account.payouts_enabled) {
         accountEntity.isOnboarded(true);
        await this._organizerStripeRepo.updateStripeAccount(accountEntity.id!,accountEntity);
    } else {
      throw new Error(ErrorMessages.STRIPE.ON_BOARDING.VERIFICATION_FAILED);
    }

    return true;
  }
}
