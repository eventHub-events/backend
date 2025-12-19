import { ErrorMessages } from '../../../../constants/errorMessages';
import { SubscriptionPlanStatus } from '../../../../domain/enums/admin/subscriptionPlans';
import { NotFoundError } from '../../../../domain/errors/common';
import { ISubscriptionPlansRepository } from '../../../../domain/repositories/admin/ISubscriptionPlansRepository';
import { IUpdateSubscriptionPlanStatusUseCase } from '../../../interface/useCases/admin/subscription-plans/IUpdateSubscriptionPlanStatus';

export class UpdateSubscriptionPlanStatusUseCase implements IUpdateSubscriptionPlanStatusUseCase {
  constructor(private _planRepo: ISubscriptionPlansRepository) {}
  async execute(
    planId: string,
    status: SubscriptionPlanStatus
  ): Promise<string> {
    const planEntity = await this._planRepo.fetchSubscriptionPlanById(planId);
    if (!planEntity)
      throw new NotFoundError(ErrorMessages.SUBSCRIPTION_PLAN.PLAN_NOT_FOUND);

    if (status === SubscriptionPlanStatus.BLOCK) planEntity.markAsInActive();
    else planEntity.markAsActive();

    await this._planRepo.updateSubscriptionPlans(planId, planEntity);
    return ErrorMessages.SUBSCRIPTION_PLAN.STATUS_UPDATE_SUCCESS;
  }
}
