import { EventTicketingEntity } from "../../../../domain/entities/organizer/EventTicketingEntity";
import { IDomainFactory } from "../IDomainFactory";

export interface IEventTicketingEntityFactory<DbType, DomainType>  extends IDomainFactory<DbType, DomainType>{
    createEmptyTicketing(eventId: string, organizerId: string): EventTicketingEntity;
}

