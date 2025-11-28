import { UserBookingListResponseDTO } from "../../../application/DTOs/user/booking/UserBookingListResponseDTO";
import { IPdfTicketService } from "../../../application/service/user/IPdfTicketService";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";

export class PdfTicketService implements IPdfTicketService {
  async generate(booking:UserBookingListResponseDTO, ticket:any): Promise<Buffer> {
    const doc = new PDFDocument({
      size: "A5",
      margin: 20,
    });

    let chunks: Buffer[] = [];

    return new Promise(async (resolve, reject) => {
      try {
        doc.on("data", (chunk) => chunks.push(chunk));

        doc.on("end", () => {
          const pdfBuffer = Buffer.concat(chunks);
          resolve(pdfBuffer);
        });

        // ---- PDF CONTENT ----
        doc.fontSize(18).text(booking.eventName, { align: "center" });
        doc.moveDown();

        doc.fontSize(13).text(`Ticket Type: ${ticket.name}`);
        doc.text(`Quantity: ${ticket.quantity}`);
        doc.text(`Price: ₹${ticket.price}`);
        doc.text(`Venue: ${booking.eventLocation}`);
        doc.text(`Date : ${booking.eventDate}`);
        doc.text(`Booked by: ${booking.userName}`);
        doc.moveDown();

        // ---- QR CODE ----
        const qrData = JSON.stringify({
          bookingId: booking.bookingId,
          ticketType: ticket.name,
          eventId: booking.eventId,
        });

        const qrPng = await QRCode.toDataURL(qrData);
        const base64 = qrPng.split(",")[1];
        const qrBuffer = Buffer.from(base64, "base64");

        doc.image(qrBuffer, {
          fit: [150, 150],
          align: "center",
        });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}