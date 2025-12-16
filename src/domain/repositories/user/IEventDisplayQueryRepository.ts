import { EventDetailsEntity } from '../../entities/user/EventDetailsEntity';
import { EventDisplayEntity } from '../../entities/user/EventDisplayEntity';
import { UpcomingEventsDetails } from '../../entities/user/UpcomingEventsDetails';
import { IEventSearchCriteria } from '../../queries/EventSearchCriteria';

export interface IEventDisplayQueryRepository {
  findTrendingEvents(): Promise<EventDisplayEntity[]>;
  findFeaturedEvents(filters: {
    title?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: EventDisplayEntity[]; totalPages: number }>;
  findEventById(eventId: string): Promise<EventDetailsEntity | null>;
  searchEvents(
    filters: IEventSearchCriteria
  ): Promise<{ data: EventDisplayEntity[]; totalPages: number }>;

  upcomingEvents() : Promise<UpcomingEventsDetails[]>;
}
