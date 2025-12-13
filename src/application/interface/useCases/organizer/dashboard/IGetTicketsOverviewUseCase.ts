import {
  ITicketsOverview,
  OrganizerDashboardFilter,
} from '../../../../../domain/interface/organizer-dashboard/dashboard';

export interface IGetTicketsOverviewUseCase {
  execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<ITicketsOverview>;
}
