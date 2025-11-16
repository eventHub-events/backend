import { SubscriptionPlanStatus } from "../../../../domain/enums/admin/subscriptionPlans";
import { NotFoundError } from "../../../../domain/errors/common";
import { ISubscriptionPlansRepository } from "../../../../domain/repositories/admin/ISubscriptionPlansRepository";
import { IUpdateSubscriptionPlanStatusUseCase } from "../../../interface/useCases/admin/subscription-plans/IUpdateSubscriptionPlanStatus";

export class UpdateSubscriptionPlanStatusUseCase implements IUpdateSubscriptionPlanStatusUseCase {
      constructor(
           private _planRepo: ISubscriptionPlansRepository
      ){}
 async  execute(planId: string, status: SubscriptionPlanStatus): Promise<string> {

         const planEntity = await this._planRepo.fetchSubscriptionPlanById(planId);
         if(!planEntity) throw new NotFoundError("SubscriptionPlan NotFound");
         
          if(status === SubscriptionPlanStatus.BLOCK) planEntity.markAsInActive();
          else planEntity.markAsActive();

       const result =  await this._planRepo.updateSubscriptionPlans(planId, planEntity);
       return "Subscription Status updated successfully";
        
}
}