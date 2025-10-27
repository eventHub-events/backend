import { Types } from "mongoose";
import { EventCreationRequestDTO } from "../../../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../../domain/DTOs/organizer/events/EventUpdateDTO";
import { EventModerationEntity } from "../../../../../domain/entities/admin/EventModerationEntity";
import { EventEntity } from "../../../../../domain/entities/organizer/EventEntity";
import { EventApprovalStatus } from "../../../../../domain/enums/organizer/events";
import { IBaseMapper } from "../../../common/IBaseMapper";

export interface IEventMapper extends IBaseMapper<EventEntity, EventCreationRequestDTO, EventResponseDTO, EventUpdateDTO> {
   toResponseDTOList (entities: EventEntity[]): EventResponseDTO[];
    toBlankModerationEntity(eventId: Types.ObjectId, eventApprovalStatus: EventApprovalStatus ): Partial<EventModerationEntity >
}