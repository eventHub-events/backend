

import { EventTicketingEntity } from "../../entities/organizer/EventTicketingEntity";

export interface IEventTicketingRepository {
    createTicketing(dto: EventTicketingEntity): Promise<EventTicketingEntity>;
    findTicketingById(id: string): Promise<EventTicketingEntity>;
    updateTicketing(ticketingId: string, data: EventTicketingEntity): Promise<EventTicketingEntity>;
    deleteTicketing(ticketingId: string): Promise<void>;
    updateTicketingByEventId(eventId: string, data: EventTicketingEntity): Promise<EventTicketingEntity> 
    findTicketingByEventId(eventId: string) :Promise<EventTicketingEntity >
}