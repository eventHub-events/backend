import { EventModerationRequestDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { IEventModerationRepository } from "../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventModerationMapper } from "../../../interface/mapper/admin/IEventModerationMapper";
import { ICreateEventModerationUseCase } from "../../../interface/useCases/admin/event-management/ICreateEventModerationUsecase";
import { IUpdateEventUseCase } from "../../../interface/useCases/organizer/events/IEditEventUseCase";

export class CreateEventModerationUseCase implements ICreateEventModerationUseCase {
  constructor(
       private _eventModerationRepository: IEventModerationRepository,
       private _moderationMapper : IEventModerationMapper,
        private _eventUpdateUseCase : IUpdateEventUseCase
  ){}

  async execute(dto: EventModerationRequestDTO): Promise<EventModerationResponseDTO> {

      const moderationEntity = this._moderationMapper.toEntity(dto);
      
      const dtoForEvent = {approvedStatus: dto. eventApprovalStatus};
        const [created,user]  =await Promise.all([this._eventModerationRepository.createEventModeration(moderationEntity), this._eventUpdateUseCase.execute(dto.eventId,dtoForEvent)])

    return this._moderationMapper.toResponseDTO(created);
  }
}