import { EventDisplayEntity } from "../../entities/user/EventDisplayEntity";


export interface IEventDisplayQueryRepository {
  findTrendingEvents(): Promise<EventDisplayEntity[]>;
  findFeaturedEvents(): Promise<EventDisplayEntity[]>;
}