import cron, { ScheduledTask } from "node-cron";
import { IEventLifeCycleJob } from "../../application/interface/jobs/IEventLifeCycleJob";
import { IExpiredEventUseCase } from "../../application/interface/useCases/organizer/events/IExpiredEventUseCase";

export class CronEventLifecycleJob implements IEventLifeCycleJob {
   private _task : ScheduledTask| null = null;

   constructor(
     private _schedule = "*/5 * * * *",
     private _eventLifecycleUseCase : IExpiredEventUseCase
   ){}
 start(): void {

    if (this._task) {
      console.log(" Event expiry job already running.");
      return;
    }

    console.log(" Initializing event expiry job...");

    this._task = cron.schedule(this._schedule, async () => {

      console.log(" Running event expiry check...");

      try {

        await this._eventLifecycleUseCase.execute();

      } catch (err) {

        const errMessage =
          err instanceof Error ? err.message : "Error in event cron job";

        console.error(errMessage);
      }

    });

    console.log(" Event expiry job scheduled successfully.");
  }

  stop(): void {

    if (this._task) {
      this._task.stop();
      this._task = null;
      console.log(" Event expiry job stopped.");
    }

  }
}