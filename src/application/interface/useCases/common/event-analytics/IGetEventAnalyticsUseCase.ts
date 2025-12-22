import { EventAnalyticsData } from '../../../../../domain/interface/event-analytics/EventAnalysisData';
import { EventAnalyticsFilter } from '../../../../../domain/interface/event-analytics/eventAnalyticsFilter';

export interface IGetEventAnalyticsUseCase {
  execute(
    filter: EventAnalyticsFilter,
    organizerId?: string,
  ): Promise<EventAnalyticsData>;
}
