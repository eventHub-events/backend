import cron ,{ ScheduledTask } from "node-cron";
import { IPayoutSchedulerJob } from "../../application/interface/jobs/IPayoutSchedulerJob";
import { IProcessPayoutUseCase } from "../../application/interface/useCases/organizer/payout/IProcessPayoutUseCase";

export class PayoutSchedulerJob implements IPayoutSchedulerJob {
    private _task: ScheduledTask | null = null;
   constructor(
          private readonly _schedule :string = "* * * * *"
,
          private _processPayoutUseCase: IProcessPayoutUseCase
   ){}
   start(): void {
       if(this._task) return;

       this._task = cron.schedule(this._schedule, async () => {
             console.log(" Running payout job...");
             await this._processPayoutUseCase.execute()
       })
   }
   stop(): void {
      this._task?.stop();
      this._task = null;
      console.log("Payout Scheduler stopped.");
   }

}