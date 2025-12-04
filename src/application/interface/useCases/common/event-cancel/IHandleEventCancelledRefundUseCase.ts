export interface IHandleEventCancelledRefundUseCase {
   execute(data:{paymentId: string, refundAmount:number}): Promise<void>;
}