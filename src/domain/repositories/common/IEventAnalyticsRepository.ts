import { EventAnalyticsData } from '../../interface/event-analytics/EventAnalysisData';
import { EventAnalyticsFilter } from '../../interface/event-analytics/eventAnalyticsFilter';

export interface IEventAnalyticsRepository {
  getEventAnalytics(
    filter: EventAnalyticsFilter,
    organizerId?: string,
  ): Promise<EventAnalyticsData>;
}
