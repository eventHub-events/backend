
import { EventTicketingRequestDTO } from "../../../DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../../DTOs/organizer/ticketing/EventTicketingResponseDTO";
import { EventTicketingEntity } from "../../../../domain/entities/organizer/EventTicketingEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface ITicketingMapper extends IBaseMapper <EventTicketingEntity, EventTicketingRequestDTO, EventTicketingResponseDTO> {}