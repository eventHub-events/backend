import { EventTicketingEditDTO } from "../../DTOs/organizer/events/EventTicketingEditDTO";
import { EventTicketingRequestDTO } from "../../DTOs/organizer/events/EventTicketingRequestDTO";
import { EventTicketingEntity } from "../../entities/organizer/EventTicketingEntity";

export interface IEventTicketingRepository {
    create(dto: EventTicketingRequestDTO): EventTicketingEntity;
    findById(id: string): EventTicketingEntity;
    update(id: string, dto: EventTicketingEditDTO): EventTicketingEntity;
    delete(id: string): boolean;
}