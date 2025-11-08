import { EventTicketingResponseDTO } from "../../../DTOs/organizer/ticketing/EventTicketingResposeDTO";
import { EventTicketingEntity } from "../../../../domain/entities/organizer/EventTicketingEntity";
import { IEventTicketingRepository } from "../../../../domain/repositories/organizer/IEventTicketingRepository";
import { ITicketingMapper } from "../../../interface/mapper/organizer/ITicketingMapper";
import { IFetchTicketingDetailsByEventUseCase } from "../../../interface/useCases/organizer/eventTicketing/IFetchTicketingByEventUseCase";

export class FetchTicketingDetailsByEventUseCase implements IFetchTicketingDetailsByEventUseCase  {
     constructor(
            private _ticketingRepository : IEventTicketingRepository,
            private _ticketingMapper : ITicketingMapper

     ){}
 async execute(eventId: string): Promise<EventTicketingResponseDTO> {

     const fetchedData = await this._ticketingRepository.findTicketingByEventId(eventId);
    return this._ticketingMapper.toResponseDTO(fetchedData);
 }
}