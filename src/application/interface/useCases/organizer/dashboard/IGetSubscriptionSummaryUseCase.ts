import { IOrganizerSubscriptionSummary, OrganizerDashboardFilter } from "../../../../../domain/interface/organizer-dashboard/dashboard";

export interface IGetSubscriptionSummaryUseCase {
  execute(organizerId: string, filter?: OrganizerDashboardFilter) :Promise<IOrganizerSubscriptionSummary| null>;
}