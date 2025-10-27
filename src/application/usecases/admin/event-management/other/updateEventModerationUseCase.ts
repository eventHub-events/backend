import { EventModerationResponseDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { EventApprovalStatus } from "../../../../../domain/enums/organizer/events";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";

import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { IUpdateEventModerationUseCase } from "../../../../interface/useCases/admin/event-management/IUpdateEventModerationUseCase";
import { IUpdateEventUseCase } from "../../../../interface/useCases/organizer/events/IEditEventUseCase";

export class UpdateEventModerationUseCase implements IUpdateEventModerationUseCase {
  constructor(
     private _eventModerationRepository : IEventModerationRepository,
     private _moderationMapper : IEventModerationMapper,
     private _eventUpdateUseCase : IUpdateEventUseCase
    ){}

  async execute(eventId: string, dto: EventModerationUpdateDTO): Promise<EventModerationResponseDTO> {
      const updateData = this._moderationMapper.toEntityForUpdate(dto)
      const fetchedEntity = await this._eventModerationRepository.findEventModerationByEventId(eventId);
       const updateEntity =  fetchedEntity.update(updateData);
       
        const updated  =await this._eventModerationRepository.updateEventModeration(eventId,updateEntity);

      return this._moderationMapper.toResponseDTO(updated)

  }
}