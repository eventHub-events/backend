import { IOrganizerSubscriptionRepository } from '../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository';
import { IExpireSubscriptionUseCase } from '../../../interface/useCases/organizer/subscription/IExpireSubscriptionUseCase';

export class ExpireSubscriptionUseCase implements IExpireSubscriptionUseCase {
  constructor(private _subscriptionRepo: IOrganizerSubscriptionRepository) {}
  async execute(): Promise<void> {
    const currentDate = new Date();

    const expiredSubscriptions =
      await this._subscriptionRepo.fetchExpiredSubscription(currentDate);

    if (!expiredSubscriptions.length) {
      
      return;
    }
   

    for (const sub of expiredSubscriptions) {
      sub.markAsExpired();
      await this._subscriptionRepo.updateSubscription(sub.id!, sub);
    }

    
  }
}
