import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";

export interface IFetchModerationByEventIdUseCase {
  execute(eventId: string) :Promise<EventModerationResponseDTO>;
}