import { EventModerationRequestDTO } from '../../../../DTOs/admin/EventModeration/EventModerationReqDTO';
import { EventModerationResponseDTO } from '../../../../DTOs/admin/EventModeration/EventModerationResponseDTO';

export interface IUnblockEventUseCase {
  execute(
    eventId: string,
    data: EventModerationRequestDTO
  ): Promise<EventModerationResponseDTO>;
}
