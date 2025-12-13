import cron, { ScheduledTask } from 'node-cron';
import { IExpireSubscriptionUseCase } from '../../application/interface/useCases/organizer/subscription/IExpireSubscriptionUseCase';
import { ICronSubscriptionExpiryJob } from '../../application/interface/jobs/ISubscriptionExpiryJob';

export class CronSubscriptionExpiryJob implements ICronSubscriptionExpiryJob {
  private task: ScheduledTask | null = null;

  constructor(
    private readonly schedule: string = '0 0 * * *',
    private _expireSubscriptionUseCase: IExpireSubscriptionUseCase
  ) {}
  start(): void {
    if (this.task) {
      console.log(' Subscription expiry job already running.');
      return;
    }
    console.log(' Initializing subscription expiry job...');
    this.task = cron.schedule(this.schedule, async () => {
      console.log('🕛 Running daily subscription expiry check...');

      try {
        await this._expireSubscriptionUseCase.execute();
      } catch (err) {
        const errMessage =
          err instanceof Error ? err.message : 'Error in scheduling work';
        console.log(errMessage);
      }
    });
    console.log('✅ Subscription expiry job scheduled successfully.');
  }
  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log(' Subscription expiry job stopped.');
    } else {
      console.log(' No active subscription expiry job to stop.');
    }
  }
}
