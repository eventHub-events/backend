import { TransactionsFilter } from "../../../../../domain/interface/admin-finance-query/transactions";

export interface IExportTransactionsReportUseCase {
  execute(filter : TransactionsFilter): Promise<PDFKit.PDFDocument>;
}