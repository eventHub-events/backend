import { AdminDashboardDTO } from "../../../../DTOs/admin/dashboard/AdminDashboardDTO";



export interface IAdminDashboardUseCase {
  execute(): Promise<AdminDashboardDTO>;
}
