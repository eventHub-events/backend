import { EventModerationRequestDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";

export interface IRejectEventUseCase {
  execute(eventId: string, data: EventModerationRequestDTO): Promise<EventModerationResponseDTO>;
}