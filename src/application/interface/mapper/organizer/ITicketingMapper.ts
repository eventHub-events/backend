import { EventTicketingEditDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingEditDTO";
import { EventTicketingRequestDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingRequestDTO";
import { EventTicketingResponseDTO } from "../../../../domain/DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { EventTicketingEntity } from "../../../../domain/entities/organizer/EventTicketingEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface ITicketingMapper extends IBaseMapper <EventTicketingEntity, EventTicketingRequestDTO, EventTicketingResponseDTO,  EventTicketingEditDTO> {}