export interface IHandleEventCancelledRefundUseCase {
  execute(data: {
    paymentId: string;
    refundAmount: number;
    refundId: string;
  }): Promise<void>;
}
