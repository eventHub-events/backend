import { AdminActionDTO } from '../../../../../DTOs/common/report/AdminReportActionDTO';

export interface IAdminActionTakenUseCase {
  execute(data: AdminActionDTO): Promise<string>;
}
