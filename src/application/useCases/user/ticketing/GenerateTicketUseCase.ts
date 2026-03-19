import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { UserBookingListResponseDTO } from '../../../DTOs/user/booking/UserBookingListResponseDTO';
import { IGenerateTicketUseCase } from '../../../interface/useCases/user/ticketing/IGenerateTicketUseCase';
import { IStorageService } from '../../../service/common/IStorageService';
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { ENV } from '../../../../infrastructure/config/common/env';

export class GenerateTicketUseCase implements IGenerateTicketUseCase {
  constructor(
    private _bookingRepo: IBookingRepository,
    private _storageService: IStorageService
  ) {}

  async execute(booking: UserBookingListResponseDTO): Promise<string[]> {

    const ticketUrls: string[] = [];

    const qrData = `${ENV.FRONTEND_URL}/ticket/${booking.bookingId}`;

    const qrBuffer = await QRCode.toBuffer(qrData, {
      width: 300,
    });

    const totalTickets = booking.tickets.reduce(
      (sum, ticket) => sum + ticket.quantity,
      0
    );

    const canvas = createCanvas(800, 420);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ticket card
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(30, 30, 740, 360, 20);
    ctx.fill();

    // Gradient header
    const gradient = ctx.createLinearGradient(30, 30, 770, 30);
    gradient.addColorStop(0, "#ec4899");
    gradient.addColorStop(1, "#6366f1");

    ctx.fillStyle = gradient;
    ctx.fillRect(30, 30, 740, 90);

    // Event name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(booking.eventName, 50, 75);

    // Organizer
    ctx.font = "16px sans-serif";
    ctx.fillText(`Organized by ${booking.organizerName}`, 50, 105);

    // Divider
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(30, 140);
    ctx.lineTo(770, 140);
    ctx.stroke();

    // Ticket details
    ctx.fillStyle = "#111827";
    ctx.font = "18px sans-serif";

    let yPosition = 180;

    for (const ticket of booking.tickets) {
      ctx.fillText(
        `${ticket.name} x ${ticket.quantity} - ₹${ticket.price}`,
        50,
        yPosition
      );
      yPosition += 28;
    }

    // Total tickets
    yPosition += 10;
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`Total Tickets: ${totalTickets}`, 50, yPosition);

    // Venue
    yPosition += 35;
    ctx.font = "16px sans-serif";
    ctx.fillText(`Venue: ${booking.eventLocation}`, 50, yPosition);

    // Date
    yPosition += 25;
    ctx.fillText(`Date: ${booking.eventDate}`, 50, yPosition);

    // Booking ID
    yPosition += 25;
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px sans-serif";
    ctx.fillText(`Booking ID: ${booking.bookingId}`, 50, yPosition);

    // Perforated divider
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(520, 150);
    ctx.lineTo(520, 360);
    ctx.stroke();

    // QR code
    const qrImage = await loadImage(qrBuffer);
    ctx.drawImage(qrImage, 560, 190, 180, 180);

    // QR label
    ctx.setLineDash([]);
    ctx.fillStyle = "#64748b";
    ctx.font = "14px sans-serif";
    ctx.fillText("Scan for entry", 610, 385);

    // Upload ticket
    const buffer = canvas.toBuffer('image/png');
    const fileName = `ticket-${booking.bookingId}.png`;

    console.log("Uploading ticket...");

    const url = await this._storageService.uploadBuffer(
      buffer,
      `tickets/${fileName}`
    );

    console.log("Ticket URL", url);

    ticketUrls.push(url);

    const bookingEntity = await this._bookingRepo.findBookingById(
      booking.bookingId!
    );

    bookingEntity.ticketUrls = ticketUrls;

    await this._bookingRepo.updateBooking(
      booking.bookingId!,
      bookingEntity
    );

    return ticketUrls;
  }
}