import { EventAnalyticsData } from "../../../../../domain/interface/event-analytics/EventAnalysisData";
import { EventAnalyticsFilter } from "../../../../../domain/interface/event-analytics/eventAnalyticsFilter";

export interface IGetEventAnalyticsUseCase {
execute(organizerId :string, filter : EventAnalyticsFilter): Promise<EventAnalyticsData>;
}