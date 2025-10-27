import { EventModerationRequestDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";

export interface ICreateEventModerationUseCase  {
  execute(dto: EventModerationRequestDTO) : Promise<EventModerationResponseDTO>;
}