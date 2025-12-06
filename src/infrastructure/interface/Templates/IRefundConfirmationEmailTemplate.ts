export interface IRefundConfirmationEmailTemplate {
  refundBooking(data:{userName: string; eventName: string, refundAmount: number; bookingId :string}): {subject: string, html: string};
}