import { OrganizerSubscriptionEntity } from "../../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { OrganizerSubscriptionRequestDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionRequestDTO";
import { OrganizerSubscriptionResponseDTO } from "../../../DTOs/organizer/subscription/OrganizerSubscriptionResponseDTO";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IOrganizerSubscriptionMapper extends IBaseMapper<OrganizerSubscriptionEntity,OrganizerSubscriptionRequestDTO, OrganizerSubscriptionResponseDTO> {}