import { EventModerationResponseDTO } from '../../../../DTOs/admin/EventModeration/EventModerationResponseDTO';

export interface IFetchModerationByEventIdUseCase {
  execute(eventId: string): Promise<EventModerationResponseDTO>;
}
