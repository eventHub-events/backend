import { SubscriptionStatus } from "../../../../domain/enums/organizer/subscription";
import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { OrganizerSubscriptionRequestDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";
import { IOrganizerSubscriptionMapper } from "../../../interface/mapper/organizer/IOrganizerMapper";
import { IUpgradeSubscriptionUseCase } from "../../../interface/useCases/organizer/subscription/IUpgradeSubscriptionUseCase";

export class UpgradeSubscriptionUseCase implements IUpgradeSubscriptionUseCase {
       constructor(
             private _subscriptionRepo : IOrganizerSubscriptionRepository,
             private _subscriptionMapper : IOrganizerSubscriptionMapper
       ){}
async execute(dto: OrganizerSubscriptionRequestDTO): Promise<void> {
    
  const currentSub = await this._subscriptionRepo.fetchSubscriptionById(dto.organizerId); 
   
     if(currentSub){
          currentSub.markAsExpired();
           await this._subscriptionRepo.updateSubscription(currentSub.id!, currentSub);
        }
     
        const startDate = new Date();
        const endDate  = new Date();
         endDate.setDate(startDate.getDate()+ dto.durationInDays);
         const status = SubscriptionStatus.Active;
        
       const updatedDto =  {...dto,startDate, endDate, status};
    
             const updateEntity = this._subscriptionMapper.toEntity(updatedDto);
           await this._subscriptionRepo.createSubscription(updateEntity);

      

}

}