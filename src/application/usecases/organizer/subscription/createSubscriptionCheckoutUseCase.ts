import { ICreateSubscriptionCheckoutUseCase } from '../../../interface/useCases/organizer/subscription/ICreateSubscriptionCheckoutUseCase';
import { IStripePaymentService } from '../../../service/common/IStripePaymentService';

export class CreateSubscriptionCheckoutUseCase implements ICreateSubscriptionCheckoutUseCase {
  constructor(private _stripePaymentService: IStripePaymentService) {}
  async execute(data: {
    planName: string;
    price: number;
    organizerId: string;
    durationInDays: number;
    organizerName: string;
    organizerEmail: string;
    planId: string;
    subscriptionType: string;
    payoutDelayDays: number;
    commissionRate: number;
  }): Promise<string> {
    if (data.subscriptionType === 'new') {
      return await this._stripePaymentService.createSubscriptionCheckout(data);
    } else if (data.subscriptionType === 'upgrade') {
      return await this._stripePaymentService.createUpgradeSubscriptionCheckout(
        data
      );
    }

    throw new Error('Invalid subscription type');
  }
}
