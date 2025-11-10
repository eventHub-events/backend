
import { OrganizerSubscriptionResponseDTO } from "../../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";

export interface IFetchSubscriptionByIdUseCase {
   execute(organizerId: string): Promise<OrganizerSubscriptionResponseDTO>;
}