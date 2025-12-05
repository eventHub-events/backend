import { EventModerationResponseDTO } from "../../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../../DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";

import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { IUpdateEventModerationUseCase } from "../../../../interface/useCases/admin/event-management/IUpdateEventModerationUseCase";
import { IEventRepository } from "../../../../../domain/repositories/organizer/IEventsRepository";
import { NotFoundError } from "../../../../../domain/errors/common";
import { ErrorMessages } from "../../../../../constants/errorMessages";

export class UpdateEventModerationUseCase implements IUpdateEventModerationUseCase {
  constructor(
     private _eventModerationRepository : IEventModerationRepository,
     private _moderationMapper : IEventModerationMapper,
     private _eventRepo: IEventRepository
    ){}

  async execute(eventId: string, dto: EventModerationUpdateDTO): Promise<EventModerationResponseDTO> {
      const updateData = this._moderationMapper.toEntityForUpdate(dto)
      const fetchedEntity = await this._eventModerationRepository.findEventModerationByEventId(eventId);
       const updateEntity =  fetchedEntity.update(updateData);
        
       const eventEntity =  await this._eventRepo.findEventById(eventId);
         if(!eventEntity) throw new NotFoundError(ErrorMessages.EVENT.NOT_FOUND);

             eventEntity?.updateStatus(dto.eventApprovalStatus);
             const status = eventEntity.currentStatus;
       
        const [updated]  =await  Promise.all([this._eventModerationRepository.updateEventModeration(eventId,updateEntity),this._eventRepo.updateEvent(eventId, {status})]);
                        
      return this._moderationMapper.toResponseDTO(updated)

  }
}