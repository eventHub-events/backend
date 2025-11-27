import { CreateReportDTO } from "../../../../../DTOs/common/report/CreateReportDTO";
import { ReportResponseDTO } from "../../../../../DTOs/common/report/ReportResponseDTO";

export interface ICreateEventReportUseCase {
  execute(dto: CreateReportDTO): Promise<ReportResponseDTO>;
}