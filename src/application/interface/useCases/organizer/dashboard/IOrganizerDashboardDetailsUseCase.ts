import { IOrganizerDashboardOverview, OrganizerDashboardFilter } from "../../../../../domain/interface/organizer-dashboard/dashboard";

export interface IOrganizerDashboardDetailsUseCase {
  execute(organizerId: string, filter?: OrganizerDashboardFilter) : Promise<IOrganizerDashboardOverview>;
}