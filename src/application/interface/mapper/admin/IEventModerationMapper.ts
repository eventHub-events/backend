import { EventModerationRequestDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../../domain/DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { EventModerationEntity } from "../../../../domain/entities/admin/EventModerationEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IEventModerationMapper extends IBaseMapper<EventModerationEntity, EventModerationRequestDTO, EventModerationResponseDTO, EventModerationUpdateDTO> {}