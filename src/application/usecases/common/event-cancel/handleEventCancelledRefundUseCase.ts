import { ErrorMessages } from '../../../../constants/errorMessages';
import {
  BookingStatus,
  PayoutStatus,
  RefundStatus,
} from '../../../../domain/enums/user/Booking';
import { NotFoundError } from '../../../../domain/errors/common';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IRefundConfirmationEmailTemplate } from '../../../../infrastructure/interface/Templates/IRefundConfirmationEmailTemplate';
import { IHandleEventCancelledRefundUseCase } from '../../../interface/useCases/common/event-cancel/IHandleEventCancelledRefundUseCase';
import { IEmailService } from '../../../interface/useCases/user/IEmailService';

export class HandleEventCancelledRefundUseCase implements IHandleEventCancelledRefundUseCase {
  constructor(
    private _bookingRepo: IBookingRepository,
    private _refundConfirmationTemplate: IRefundConfirmationEmailTemplate,
    private _emailService: IEmailService
  ) {}
  async execute(data: {
    paymentId: string;
    refundAmount: number;
    refundId: string;
  }): Promise<void> {
    const { paymentId, refundAmount } = data;
    const booking =
      await this._bookingRepo.fetchBookingByPaymentIntentId(paymentId);
    if (!booking)
      throw new NotFoundError(ErrorMessages.BOOKING.BOOKINGS_NOT_FOUND);

    booking.status = BookingStatus.REFUNDED;
    booking.platformFee = 0;
    booking.organizerAmount = 0;
    booking.payoutStatus = PayoutStatus.CANCELLED;
    booking.refundedAmount = refundAmount;
    booking.refundDate = new Date();
    booking.refundStatus = RefundStatus.SUCCEEDED;
    booking.refundIds?.push(data.refundId);

    const template = this._refundConfirmationTemplate.refundBooking({
      userName: booking.userName,
      eventName: booking.eventTitle,
      refundAmount: refundAmount,
      bookingId: booking.id!.toString(),
    });

    await this._bookingRepo.updateBooking(booking.id!.toString()!, booking);
    await this._emailService.sendMail(
      booking.userEmail!,
      template.subject,
      template.html
    );
  }
}
