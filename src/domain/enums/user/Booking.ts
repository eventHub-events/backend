export enum BookingStatus {
  PENDING_PAYMENT = "pending-payment",
   PAYMENT_FAILED = "payment-failed",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  EXPIRED ="expired",
  REFUNDED = "refunded"
}

export enum PayoutStatus {
    PENDING ="pending",
    PAID ="paid",
    CANCELLED = "cancelled"
}
export enum RefundStatus {
    NONE ="none",
    PENDING = "pending",
    SUCCEEDED = "succeeded",
    FAILED = "failed"
}

export enum PaymentMethod {
   CARD ="card"
}