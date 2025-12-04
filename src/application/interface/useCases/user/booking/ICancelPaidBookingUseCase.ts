export interface ICancelPaidBookingUseCase {
  execute(userId :string, bookingId: string) : Promise<void>;
}