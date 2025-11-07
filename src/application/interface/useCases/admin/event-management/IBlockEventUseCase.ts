import { EventsAdminViewResponseDTO } from "../../../../DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { EventModerationRequestDTO } from "../../../../DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationEntity } from "../../../../../domain/entities/admin/EventModerationEntity";

export interface IBlockEventUseCase {
  execute(eventId: string , data: EventModerationRequestDTO): Promise<EventModerationResponseDTO>;
}