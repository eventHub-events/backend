import { TransactionsRow } from "../../../domain/interface/admin-finance-query/transactions";
import { IPdfReportService } from "../../interface/service/IPdfReportService";
import PDFDocument from "pdfkit";

export class PDFReportService implements IPdfReportService {
  async generateTransactionsPDF(rows: TransactionsRow[]): Promise<PDFKit.PDFDocument> {
      
     const doc = new PDFDocument({ margin : 30, size : "A4"});

      doc.fontSize(20).text("Transaction Report",{align: "center"});
      doc.moveDown();

      doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`);
      doc.moveDown();
      
      doc.fontSize(10).text(
        "bookingId | Event| Organizer | User | Amount | Status | PaymentDate | PaymentMethod ",
        { underline : true }
      );
      doc.moveDown(0.5);

      rows.forEach((t) =>  {
        doc.text(
          `${t.bookingId}| ${t.eventTitle} | ${t.organizerName}| ${t.userName}| ₹${t.totalAmount} | ${t.status}| ${t.createdAt}| ${t.paymentMethod}}`
        );

      });

      return doc;


  }
}