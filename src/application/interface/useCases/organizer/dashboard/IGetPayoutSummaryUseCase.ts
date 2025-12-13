import {
  IOrganizerPayoutSummary,
  OrganizerDashboardFilter,
} from '../../../../../domain/interface/organizer-dashboard/dashboard';

export interface IGetPayoutSummaryUseCase {
  execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerPayoutSummary>;
}
