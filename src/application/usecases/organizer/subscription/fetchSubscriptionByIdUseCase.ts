
import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { OrganizerSubscriptionResponseDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";
import { IOrganizerSubscriptionMapper } from "../../../interface/mapper/organizer/IOrganizerMapper";
import { IFetchSubscriptionByIdUseCase } from "../../../interface/useCases/organizer/subscription/IFetchSubscriptionByIdUseCase";

export class FetchSubscriptionByIdUseCase implements IFetchSubscriptionByIdUseCase {
    constructor(
         private _subscriptionRepo : IOrganizerSubscriptionRepository,
         private _organizerSubscriptionMapper : IOrganizerSubscriptionMapper
    ){}
    async execute(organizerId: string): Promise<OrganizerSubscriptionResponseDTO> {
          
        const fetched = await this._subscriptionRepo.fetchSubscriptionById(organizerId);
    return this._organizerSubscriptionMapper.toResponseDTO(fetched);
    
    }
}