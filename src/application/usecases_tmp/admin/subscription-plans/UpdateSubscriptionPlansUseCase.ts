import { ISubscriptionPlansRepository } from '../../../../domain/repositories/admin/ISubscriptionPlansRepository';
import { SubscriptionResponseDTO } from '../../../DTOs/admin/subscription-plans/SubscriptionResponseDTO';
import { UpdateSubscriptionRequestDTO } from '../../../DTOs/admin/subscription-plans/UpdateSubscriptionRequestDTO';
import { ISubscriptionMapper } from '../../../interface/mapper/admin/ISubscriptionMapper';
import { IUpdateSubscriptionPlansUseCase } from '../../../interface/useCases/admin/subscription-plans/IUpdateSubscriptionUseCase';

export class UpdateSubscriptionPlansUseCase implements IUpdateSubscriptionPlansUseCase {
  constructor(
    private _subscriptionPlansRepo: ISubscriptionPlansRepository,
    private _subscriptionMapper: ISubscriptionMapper
  ) {}
  async execute(
    subscriptionPlanId: string,
    dto: UpdateSubscriptionRequestDTO
  ): Promise<SubscriptionResponseDTO> {
    const subscriptionEntity =
      await this._subscriptionPlansRepo.fetchSubscriptionPlanById(
        subscriptionPlanId
      );

    const updateEntity = subscriptionEntity.update(dto);

    const updatedEntity =
      await this._subscriptionPlansRepo.updateSubscriptionPlans(
        subscriptionPlanId,
        updateEntity
      );

    return this._subscriptionMapper.toResponseDTO(updatedEntity);
  }
}
