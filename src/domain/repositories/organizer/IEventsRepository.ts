import { EventEntity } from "../../entities/organizer/EventEntity";


export interface IEventRepository {
  createEvent(event: EventEntity): Promise<EventEntity>;
  findEventById(eventId: string): Promise<EventEntity | null>;
  updateEvent(eventId: string, event: Partial<EventEntity>):  Promise<EventEntity | null>;
  DeleteEvent(eventId: string): Promise<void>;
  findEventsByOrganizerId(organizerId: string) : Promise<EventEntity[]>;
  findAllEvents(): Promise<EventEntity[]>
}