import { EventModerationResponseDTO } from '../../../../DTOs/admin/EventModeration/EventModerationResponseDTO';
import { EventModerationUpdateDTO } from '../../../../DTOs/admin/EventModeration/EventModerationUpdateDTO';

export interface IUpdateEventModerationUseCase {
  execute(
    moderationId: string,
    dto: EventModerationUpdateDTO
  ): Promise<EventModerationResponseDTO>;
}
