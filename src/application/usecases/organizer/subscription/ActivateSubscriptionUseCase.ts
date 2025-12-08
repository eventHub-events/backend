import { SubscriptionStatus } from "../../../../domain/enums/organizer/subscription";
import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { OrganizerSubscriptionRequestDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";
import { OrganizerSubscriptionResponseDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";
import { IOrganizerSubscriptionMapper } from "../../../interface/mapper/organizer/IOrganizerMapper";
import { IActivateSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IActivateSubscriptionUseCase";

export class ActivateSubScriptionUseCase implements IActivateSubscriptionUseCase {
   
    constructor(
         private _subscriptionRepository : IOrganizerSubscriptionRepository,
         private _subscriptionMapper : IOrganizerSubscriptionMapper
    ){}
async execute(dto: OrganizerSubscriptionRequestDTO): Promise<OrganizerSubscriptionResponseDTO> {
    
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate()+dto.durationInDays);
        const status = SubscriptionStatus.Active;
      const updatedDto = {startDate,endDate,status,...dto}
      

     const subscriptionEntity = this._subscriptionMapper.toEntity(updatedDto);
     const created = await this._subscriptionRepository.createSubscription(subscriptionEntity);
  return this._subscriptionMapper.toResponseDTO(created)
  
  

} 
}