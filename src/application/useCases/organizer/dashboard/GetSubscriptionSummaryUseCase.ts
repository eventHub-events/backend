import { IOrganizerSubscriptionSummary } from '../../../../domain/interface/organizer-dashboard/dashboard';
import { IOrganizerDashboardRepository } from '../../../../domain/repositories/organizer/IOrganizerDashboardRepository';

import { IGetSubscriptionSummaryUseCase } from '../../../interface/useCases/organizer/dashboard/IGetSubscriptionSummaryUseCase';

export class GetSubscriptionSummaryUseCase implements IGetSubscriptionSummaryUseCase {
  constructor(private _repo: IOrganizerDashboardRepository) {}
  async execute(
    organizerId: string
  ): Promise<IOrganizerSubscriptionSummary | null> {
    const result = await this._repo.getSubscriptionSummary(organizerId);
    
    return result;
  }
}
