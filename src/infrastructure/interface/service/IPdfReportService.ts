import { TransactionsRow } from "../../../domain/interface/admin-finance-query/transactions";


export interface IPdfReportService {
  generateTransactionsPDF(rows: TransactionsRow[]) : Promise<PDFKit.PDFDocument>

}