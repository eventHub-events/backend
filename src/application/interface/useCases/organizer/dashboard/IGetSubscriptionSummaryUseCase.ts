import { IOrganizerSubscriptionSummary } from '../../../../../domain/interface/organizer-dashboard/dashboard';

export interface IGetSubscriptionSummaryUseCase {
  execute(organizerId: string): Promise<IOrganizerSubscriptionSummary | null>;
}
