import { EventModerationResponseDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { EventApprovalStatus } from "../../../../domain/enums/organizer/events";
import { IEventModerationRepository } from "../../../../domain/repositories/admin/IEventModerationRepository";

import { IEventModerationMapper } from "../../../interface/mapper/admin/IEventModerationMapper";
import { IUpdateEventModerationUseCase } from "../../../interface/useCases/admin/event-management/IUpdateEventModerationUseCase";
import { IUpdateEventUseCase } from "../../../interface/useCases/organizer/events/IEditEventUseCase";

export class UpdateEventModerationUseCase implements IUpdateEventModerationUseCase {
  constructor(
     private _eventModerationRepository : IEventModerationRepository,
     private _moderationMapper : IEventModerationMapper,
     private _eventUpdateUseCase : IUpdateEventUseCase
    ){}

  async execute(moderationId: string, dto: EventModerationUpdateDTO): Promise<EventModerationResponseDTO> {
      const updateData = this._moderationMapper.toEntityForUpdate(dto)
      const fetchedEntity = await this._eventModerationRepository.findEventModerationById(moderationId);
       const updateEntity =  fetchedEntity.update(updateData);
       const dtoForEvent = {approvedStatus: dto.eventApprovalStatus};
          
        const [updated,user]  =await Promise.all([this._eventModerationRepository.updateEventModeration(moderationId,updateEntity), this._eventUpdateUseCase.execute(dto.eventId,dtoForEvent)])

      return this._moderationMapper.toResponseDTO(updated)

  }
}