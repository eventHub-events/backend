import { TransactionsFilter } from '../../../../domain/interface/admin-finance-query/transactions';
import { IAdminFinanceQueryRepository } from '../../../../domain/repositories/admin/IAdminFinanceQueryRepository';
import { IPdfReportService } from '../../../../infrastructure/interface/service/IPdfReportService';
import { IExportTransactionsReportUseCase } from '../../../interface/useCases/admin/finance-payout/IExportTransactionsReportUseCase';

export class ExportTransactionsReportUseCase implements IExportTransactionsReportUseCase {
  constructor(
    private _repo: IAdminFinanceQueryRepository,
    private _pdfReportService: IPdfReportService
  ) {}
  async execute(filter: TransactionsFilter): Promise<{ pdfBuffer: Buffer }> {
    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const from = filter.from ? new Date(filter.from) : defaultFrom;
    const to = filter.to ? new Date(filter.to) : now;
    const result = await this._repo.getTransactions(filter);
    const pdfBuffer = await this._pdfReportService.generateTransactionsPDF(
      result.data,
      { from, to }
    );
    return { pdfBuffer };
  }
}
