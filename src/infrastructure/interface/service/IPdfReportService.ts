import { TransactionsRow } from "../../../domain/interface/admin-finance-query/transactions";
import PDFDocument from "pdfkit";

export interface IPdfReportService {
  generateTransactionsPDF(rows: TransactionsRow[],   period: { from: Date; to: Date }) : Promise<Buffer> 

}