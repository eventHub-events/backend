import { EventTicketingRequestDTO } from '../../../../DTOs/organizer/ticketing/EventTicketingRequestDTO';
import { EventTicketingResponseDTO } from '../../../../DTOs/organizer/ticketing/EventTicketingResponseDTO';

export interface ICreateTicketingUseCase {
  execute(dto: EventTicketingRequestDTO): Promise<EventTicketingResponseDTO>;
}
