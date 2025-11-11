import { OrganizerSubscriptionResponseDTO } from "../../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";
import { OrganizerSubscriptionRequestDTO } from "../../../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";

export interface IActivateSubscriptionUseCase {
  execute(dto: OrganizerSubscriptionRequestDTO): Promise<OrganizerSubscriptionResponseDTO>;
}