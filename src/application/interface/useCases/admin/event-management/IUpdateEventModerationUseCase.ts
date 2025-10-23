import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";

export interface IUpdateEventModerationUseCase {
   execute(moderationId: string, dto: EventModerationUpdateDTO) : Promise<EventModerationResponseDTO>
}