import { EventModerationRequestDTO } from "../../../../DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { IEventModerationRepository } from "../../../../../domain/repositories/admin/IEventModerationRepository";
import { IEventModerationMapper } from "../../../../interface/mapper/admin/IEventModerationMapper";
import { ICreateEventModerationUseCase } from "../../../../interface/useCases/admin/event-management/ICreateEventModerationUseCase";

export class CreateEventModerationUseCase implements ICreateEventModerationUseCase {
  constructor(
       private _eventModerationRepository: IEventModerationRepository,
       private _moderationMapper : IEventModerationMapper,
        
  ){}

  async execute(dto: EventModerationRequestDTO): Promise<EventModerationResponseDTO> {

      const moderationEntity = this._moderationMapper.toEntity(dto);
      
      // const dtoForEvent = {approvedStatus: dto. eventApprovalStatus};
        const updated  =await this._eventModerationRepository.createEventModeration(moderationEntity)

    return this._moderationMapper.toResponseDTO(updated);
  }
}