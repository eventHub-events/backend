import { ReportRange } from "../../../../../infrastructure/types/dashboard/booking";
import { AdminDashboardDTO } from "../../../../DTOs/admin/dashboard/AdminDashboardDTO";



export interface IAdminDashboardUseCase {
  execute(range: ReportRange): Promise<AdminDashboardDTO>;
}
