import { IBookingExpirationScheduler } from "../../application/interface/jobs/IBookingExpirationScheduler";
import { IReleaseExpiredBookingsUseCase } from "../../application/interface/useCases/user/booking/IReleaseExpiredBookingsUseCase";
  import cron  from "node-cron"

export class BookingsExpirationScheduler implements IBookingExpirationScheduler {
  private _isRunning = false;

  constructor(
        private readonly _releaseExpiredBookingUseCase: IReleaseExpiredBookingsUseCase,
    private readonly schedule: string = "* * * * *",

  ) {}

  start(): void {
    cron.schedule(this.schedule, async () => {
        console.log(" Booking expiration cron tick:", new Date().toISOString());
      if (this._isRunning) return;

      this._isRunning = true;

      try {
        await this._releaseExpiredBookingUseCase.execute(new Date());
      } catch (err) {
            // Error intentionally ignored
      } finally {
        this._isRunning = false;
      }
    });

    // ✅ This logs ONLY when start() is called
    console.log("✅ Bookings Expired job scheduled successfully.");
  }
}
