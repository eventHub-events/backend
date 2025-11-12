export interface IConfirmBookingUseCase {
  execute(organizerId: string, bookingId: string, paymentId: string): Promise<void>;
}