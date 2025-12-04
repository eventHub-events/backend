export enum BookingStatus {
  PENDING_PAYMENT = "pending-payment",
   PAYMENT_FAILED = "payment_failed",
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