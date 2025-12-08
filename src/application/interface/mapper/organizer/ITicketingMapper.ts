
import { EventTicketingRequestDTO } from "../../../DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../../DTOs/organizer/ticketing/EventTicketingResponseDTO";
import { EventTicketingEntity } from "../../../../domain/entities/organizer/EventTicketingEntity";
import { IBaseMapper } from "../../common/IBaseMapper";
import { EventTicketingEditDTO } from "../../../DTOs/organizer/ticketing/EventTicketingEditDTO";

export interface ITicketingMapper extends IBaseMapper <EventTicketingEntity, EventTicketingRequestDTO, EventTicketingResponseDTO> {
     toEntityForUpdate(dto: EventTicketingEditDTO): Partial<EventTicketingEntity> 
}