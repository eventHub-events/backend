export interface IReleaseExpiredBookingsUseCase {
  execute(now?: Date) : Promise<void>;
}