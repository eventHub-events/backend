import { ReportTypes } from '../../../../../../domain/enums/common/report';
import { ReportResponseDTO } from '../../../../../DTOs/common/report/ReportResponseDTO';

export interface IGetReportsUseCase {
  execute(
    targetType: ReportTypes,
    page: string,
    limit: string
  ): Promise<{ reportData: ReportResponseDTO[]; total: number }>;
}
