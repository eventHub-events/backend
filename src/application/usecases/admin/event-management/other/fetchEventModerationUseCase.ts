import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { IFetchModerationByEventIdUseCase } from "../../../../interface/useCases/admin/event-management/IFetchModerationByEventIdUseCase";


export class FetchEventModerationByEventIdUseCase implements IFetchModerationByEventIdUseCase {
  constructor(
      private _eventModerationRepository : IEventModerationRepository,
      private _moderationMapper : IEventModerationMapper
  ){}
  async execute(eventId: string): Promise<EventModerationResponseDTO> {
      const fetchedEntity = await this._eventModerationRepository.findEventModerationByEventId(eventId);
      return this._moderationMapper.toResponseDTO(fetchedEntity);
  }
}