import { EventAnalyticsData } from '../../interface/event-analytics/EventAnalysisData';
import { EventAnalyticsFilter } from '../../interface/event-analytics/eventAnalyticsFilter';

export interface IEventAnalyticsRepository {
  getEventAnalytics(
    organizerId: string,
    filter: EventAnalyticsFilter
  ): Promise<EventAnalyticsData>;
}
