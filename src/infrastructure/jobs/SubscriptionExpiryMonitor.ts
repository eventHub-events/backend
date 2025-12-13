import { ICronSubscriptionExpiryJob } from '../../application/interface/jobs/ISubscriptionExpiryJob';

export class SubscriptionExpiryMonitor {
  constructor(private _cronSubscriptionExpiryJob: ICronSubscriptionExpiryJob) {}
  startJob(): void {
    this._cronSubscriptionExpiryJob.start();
  }
  endJob(): void {
    this._cronSubscriptionExpiryJob.stop();
  }
}
