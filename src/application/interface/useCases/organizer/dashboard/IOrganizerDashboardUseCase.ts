import { ReportRange } from "../../../../../infrastructure/types/dashboard/booking";
import { OrganizerDashboardDTO } from "../../../../DTOs/organizer/dashboard/OrganizerDashboardDTO";

export interface IOrganizerDashboardUseCase {
  execute(organizerId: string, range: ReportRange): Promise<OrganizerDashboardDTO>;
}