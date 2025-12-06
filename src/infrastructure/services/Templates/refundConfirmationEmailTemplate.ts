import { IRefundConfirmationEmailTemplate } from "../../interface/Templates/IRefundConfirmationEmailTemplate";

export class RefundConfirmationEmailTemplate implements IRefundConfirmationEmailTemplate {
 refundBooking(data: { userName: string; eventName: string; refundAmount: number; bookingId: string; }): { subject: string; html: string; } {
     return {
          subject: "Your Refund Has Been Processed 🎉",
                   html: `
        <p>Hi ${data.userName},</p>
        <p>Your refund for <strong>${data.eventName}</strong> has been successfully processed.</p>

        <p>
          <strong>Booking ID:</strong> ${data.bookingId}<br/>
          <strong>Refund Amount:</strong> ₹${data.refundAmount}
        </p>

        <p>The refunded amount will appear in your account within 5–7 business days.</p>

        <p>Thank you,<br/>EventHub Support Team</p>
      `,
     }
 }
}