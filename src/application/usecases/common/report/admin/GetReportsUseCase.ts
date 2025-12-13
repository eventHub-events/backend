import { ReportTypes } from '../../../../../domain/enums/common/report';
import { IReportRepository } from '../../../../../domain/repositories/common/IReportRepository';
import { ReportResponseDTO } from '../../../../DTOs/common/report/ReportResponseDTO';
import { IReportMapper } from '../../../../interface/mapper/common/report/IReportMapper';
import { IGetReportsUseCase } from '../../../../interface/useCases/common/report/admin/IGetReportUseCase';

export class GetReportsUseCase implements IGetReportsUseCase {
  constructor(
    private _ReportRepo: IReportRepository,
    private _reportMapper: IReportMapper
  ) {}
  async execute(
    targetType: ReportTypes,
    page: string,
    limit: string
  ): Promise<{ reportData: ReportResponseDTO[]; total: number }> {
    const { reportEntity, totalPages } = await this._ReportRepo.getReports(
      targetType,
      Number(page),
      Number(limit)
    );

    const reportData = this._reportMapper.toResponseDTOList(reportEntity);

    return { reportData, total: totalPages };
  }
}
