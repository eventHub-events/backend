import { EventDetailsEntity } from "../../entities/user/EventDetailsEntity";
import { EventDisplayEntity } from "../../entities/user/EventDisplayEntity";


export interface IEventDisplayQueryRepository {
  findTrendingEvents(): Promise<EventDisplayEntity[]>;
   findFeaturedEvents(filters:{
   title?: string;
   location?: string;
   category?:string;
   page?: number;
   limit?: number
 }): Promise<{data:EventDisplayEntity[]; totalPages: number}>
  findEventById(eventId: string) : Promise<EventDetailsEntity | null>;
}