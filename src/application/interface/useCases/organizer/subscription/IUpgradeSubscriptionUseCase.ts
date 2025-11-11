import { OrganizerSubscriptionRequestDTO } from "../../../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";


export interface IUpgradeSubscriptionUseCase {
  
    execute(dto: OrganizerSubscriptionRequestDTO): Promise<void>;
}