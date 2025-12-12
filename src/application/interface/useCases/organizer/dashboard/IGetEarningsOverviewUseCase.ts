import { IEarningsOverview, OrganizerDashboardFilter } from "../../../../../domain/interface/organizer-dashboard/dashboard";

export interface IGetEarningsOverviewUseCase {
  execute(organizerId: string, filter?: OrganizerDashboardFilter): Promise<IEarningsOverview>;
}