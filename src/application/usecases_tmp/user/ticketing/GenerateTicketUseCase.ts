import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { UserBookingListResponseDTO } from '../../../DTOs/user/booking/UserBookingListResponseDTO';
import { IGenerateTicketUseCase } from '../../../interface/useCases/user/ticketing/IGenerateTicketUseCase';
import { IStorageService } from '../../../service/common/IStorageService';
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
export class GenerateTicketUseCase implements IGenerateTicketUseCase {
  constructor(
    private _bookingRepo: IBookingRepository,
    private _storageService: IStorageService
  ) {}

  async execute(booking: UserBookingListResponseDTO): Promise<string[]> {
    const ticketUrls: string[] = [];

    for (const ticket of booking.tickets) {
      const qrData = JSON.stringify({
        bookingId: booking.bookingId,
        eventId: booking.eventId,
        ticketType: ticket.name,
        ticketPrice: ticket.price,
      });
      const qrBuffer = await QRCode.toBuffer(qrData, { width: 300 });
      const canvas = createCanvas(600, 400);
      const ctx = canvas.getContext('2d');
      // background//
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 400);

      // eventInfo //
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText(`${booking.eventName}`, 20, 40);
      ctx.font = '18px Arial';
      ctx.fillText(`Type: ${ticket.name}`, 20, 80);
      ctx.fillText(`Price: ₹${ticket.price}`, 20, 110);
      ctx.fillText(`Quantity: ${ticket.quantity}`, 20, 140);
      ctx.fillText(`Venue: ${booking.eventLocation}`, 20, 170);
      ctx.fillText(`Date: ${booking.eventDate}`, 20, 200);
      ctx.fillText(`Booked by: ${booking.userName}`, 20, 230);

      // Paste QR code on the right
      const qrImage = await loadImage(qrBuffer);
      ctx.drawImage(qrImage, 380, 100, 200, 200);
      // Upload ticket image to Cloudinary or S3
      const buffer = canvas.toBuffer('image/png');
      const fileName = `ticket-${booking.bookingId}-${ticket.name}.png`;
      const url = await this._storageService.uploadBuffer(
        buffer,
        `tickets/${fileName}`
      );

      ticketUrls.push(url);
    }

    const bookingEntity = await this._bookingRepo.findBookingById(
      booking.bookingId!
    );

    bookingEntity.ticketUrls = ticketUrls;
    await this._bookingRepo.updateBooking(booking.bookingId!, bookingEntity);

    return ticketUrls;
  }
}
