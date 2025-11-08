import { EventModerationRequestDTO } from "../../../DTOs/admin/EventModeration/EventModerationReqDTO";
import { EventModerationResponseDTO } from "../../../DTOs/admin/EventModeration/EventModerationResponseDTO";
import { EventModerationUpdateDTO } from "../../../DTOs/admin/EventModeration/EventModerationUpdateDTO";
import { EventModerationEntity } from "../../../../domain/entities/admin/EventModerationEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IEventModerationMapper extends IBaseMapper<EventModerationEntity, EventModerationRequestDTO, EventModerationResponseDTO, EventModerationUpdateDTO> {}