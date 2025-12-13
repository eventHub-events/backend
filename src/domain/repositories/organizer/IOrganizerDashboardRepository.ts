import {
  IEarningsOverview,
  IOrganizerEventPerformance,
  IOrganizerKycStatus,
  IOrganizerPayoutSummary,
  IOrganizerSubscriptionSummary,
  ITicketsOverview,
  OrganizerDashboardFilter,
} from '../../interface/organizer-dashboard/dashboard';

export interface IOrganizerDashboardRepository {
  getTicketsOverview(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<ITicketsOverview>;
  getEarningsOverview(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IEarningsOverview>;
  getEventPerformance(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerEventPerformance>;
  getPayoutSummary(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerPayoutSummary>;
  getSubscriptionSummary(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerSubscriptionSummary | null>;
  getKycStatus(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerKycStatus>;
}
