import { TransactionsFilter } from "../../../../domain/interface/admin-finance-query/transactions";
import { IAdminFinanceQueryRepository } from "../../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { IPdfReportService } from "../../../../infrastructure/interface/service/IPdfReportService";
import { IExportTransactionsReportUseCase } from "../../../interface/useCases/admin/finance-payout/IExportTransactionsReportUseCase";

export class ExportTransactionsReportUseCase implements  IExportTransactionsReportUseCase{
    constructor(
       private _repo : IAdminFinanceQueryRepository,
       private _pdfReportService : IPdfReportService
    ){}
 async execute(filter: TransactionsFilter): Promise<PDFKit.PDFDocument> {
     
     const result = await this._repo.getTransactions(filter);
    return this._pdfReportService.generateTransactionsPDF(result.data);

 }
}