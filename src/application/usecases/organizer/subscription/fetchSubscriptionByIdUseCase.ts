import { NotFoundError } from '../../../../domain/errors/common';
import { IOrganizerSubscriptionRepository } from '../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository';
import { Subscription } from '../../../../infrastructure/constants/response-messages/organizer/subscription';
import { OrganizerSubscriptionResponseDTO } from '../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO';
import { IOrganizerSubscriptionMapper } from '../../../interface/mapper/organizer/IOrganizerMapper';
import { IFetchSubscriptionByIdUseCase } from '../../../interface/useCases/organizer/subscription/IFetchSubscriptionByIdUseCase';

export class FetchSubscriptionByIdUseCase implements IFetchSubscriptionByIdUseCase {
  constructor(
    private _subscriptionRepo: IOrganizerSubscriptionRepository,
    private _organizerSubscriptionMapper: IOrganizerSubscriptionMapper
  ) {}
  async execute(
    organizerId: string
  ): Promise<OrganizerSubscriptionResponseDTO> {
    const fetched =
      await this._subscriptionRepo.fetchSubscriptionById(organizerId);
    if (!fetched) throw new NotFoundError(Subscription.SUBSCRIPTION_FAILURE);

    return this._organizerSubscriptionMapper.toResponseDTO(fetched);
  }
}
