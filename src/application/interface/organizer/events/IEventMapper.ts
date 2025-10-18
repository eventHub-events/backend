import { EventCreationRequestDTO } from "../../../../domain/DTOs/organizer/events/EventCreationRequestDTO";
import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { EventUpdateDTO } from "../../../../domain/DTOs/organizer/events/EventUpdateDTO";
import { EventEntity } from "../../../../domain/entities/organizer/EventEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IEventMapper extends IBaseMapper<EventEntity, EventCreationRequestDTO, EventResponseDTO, EventUpdateDTO> {}