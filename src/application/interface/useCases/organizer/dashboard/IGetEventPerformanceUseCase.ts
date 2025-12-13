import {
  IOrganizerEventPerformance,
  OrganizerDashboardFilter,
} from '../../../../../domain/interface/organizer-dashboard/dashboard';

export interface IGetEventPerformanceUseCase {
  execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerEventPerformance>;
}
