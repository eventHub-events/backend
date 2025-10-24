import { EventsAdminViewResponseDTO } from "../../../../../domain/DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { EventModerationRequestDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationEntity } from "../../../../../domain/entities/admin/EventModerationEntity";

export interface IBlockEventUseCase {
  execute(eventId: string , data: EventModerationRequestDTO): Promise<EventModerationResponseDTO>;
}