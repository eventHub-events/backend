import { EventDetailsEntity } from "../../entities/user/EventDetailsEntity";
import { EventDisplayEntity } from "../../entities/user/EventDisplayEntity";


export interface IEventDisplayQueryRepository {
  findTrendingEvents(): Promise<EventDisplayEntity[]>;
  findFeaturedEvents(): Promise<EventDisplayEntity[]>;
  findEventById(eventId: string) : Promise<EventDetailsEntity | null>;
}