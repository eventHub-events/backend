import { UserBookingListResponseDTO } from '../../../application/DTOs/user/booking/UserBookingListResponseDTO';
import { IPdfTicketService } from '../../../application/service/user/IPdfTicketService';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';

export class PdfTicketService implements IPdfTicketService {
  async generate(
    booking: UserBookingListResponseDTO,
    ticket: { name: string; quantity: number; price: number }
  ): Promise<Buffer> {
    const doc = new PDFDocument({
      size: 'A5',
      margin: 20,
    });

    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      
      doc.fontSize(18).text(booking.eventName, { align: 'center' });
      doc.moveDown();

      doc.fontSize(13).text(`Ticket Type: ${ticket.name}`);
      doc.text(`Quantity: ${ticket.quantity}`);
      doc.text(`Price: ₹${ticket.price}`);
     doc.text(`Venue: ${booking.eventLocation}`);
doc.text(
  `Event Duration: ${booking.eventStartDate} - ${booking.eventEndDate}`
);
doc.text(`Attendance Date: ${booking.attendanceDate}`);
doc.text(
  `Event Time: ${booking.eventStartTime} - ${booking.eventEndTime}`
);
doc.text(`Booked by: ${booking.userName}`);
doc.moveDown();

    
      const qrData = JSON.stringify({
        bookingId: booking.bookingId,
        ticketType: ticket.name,
        eventId: booking.eventId,
      });

     
      QRCode.toDataURL(qrData)
        .then(qrPng => {
          try {
            const base64 = qrPng.split(',')[1];
            const qrBuffer = Buffer.from(base64, 'base64');

            doc.image(qrBuffer, { fit: [150, 150], align: 'center' });
            doc.end();
          } catch (err) {
            reject(err);
          }
        })
        .catch(err => reject(err));
    });
  }
}
