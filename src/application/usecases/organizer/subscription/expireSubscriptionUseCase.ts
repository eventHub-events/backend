import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { IExpireSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IExpireSubscriptionUseCase";

export class ExpireSubscriptionUseCase implements IExpireSubscriptionUseCase {
   constructor(
         private _subscriptionRepo : IOrganizerSubscriptionRepository
   ){}
  async execute(): Promise<void> {
      const  currentDate = new Date();
  
    const expiredSubscriptions = await this._subscriptionRepo.fetchExpiredSubscription(currentDate);
       
          if (!expiredSubscriptions.length) {
              console.log(" No expired subscriptions found.");
           return;
          }
      console.log(` Found ${expiredSubscriptions.length} expired subscriptions.`);

      for(const sub of expiredSubscriptions) {
           sub.markAsExpired();
          await this._subscriptionRepo.updateSubscription(sub.id!,sub);
        }
       
       console.log(" All expired subscriptions have been updated.");
    
   }
}