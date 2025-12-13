import {
  IOrganizerDashboardOverview,
  OrganizerDashboardFilter,
} from '../../../../domain/interface/organizer-dashboard/dashboard';
import { IGetEarningsOverviewUseCase } from '../../../interface/useCases/organizer/dashboard/IGetEarningsOverviewUseCase';
import { IGetEventPerformanceUseCase } from '../../../interface/useCases/organizer/dashboard/IGetEventPerformanceUseCase';
import { IGetKycStatusUseCae } from '../../../interface/useCases/organizer/dashboard/IGetKycStatusUseCase';
import { IGetPayoutSummaryUseCase } from '../../../interface/useCases/organizer/dashboard/IGetPayoutSummaryUseCase';
import { IGetSubscriptionSummaryUseCase } from '../../../interface/useCases/organizer/dashboard/IGetSubscriptionSummaryUseCase';
import { IGetTicketsOverviewUseCase } from '../../../interface/useCases/organizer/dashboard/IGetTicketsOverviewUseCase';
import { IOrganizerDashboardDetailsUseCase } from '../../../interface/useCases/organizer/dashboard/IOrganizerDashboardDetailsUseCase';

export class OrganizerDashboardDetailsUseCase implements IOrganizerDashboardDetailsUseCase {
  constructor(
    private _ticketOverviewUseCase: IGetTicketsOverviewUseCase,
    private _earningsOverviewUseCase: IGetEarningsOverviewUseCase,
    private _eventPerformanceUseCase: IGetEventPerformanceUseCase,
    private _payoutSummaryUseCase: IGetPayoutSummaryUseCase,
    private _getSubscriptionSummaryUseCase: IGetSubscriptionSummaryUseCase,
    private _getKycStatusUseCase: IGetKycStatusUseCae
  ) {}
  async execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerDashboardOverview> {
    const [tickets, earnings, events, payouts, subscription, kyc] =
      await Promise.all([
        this._ticketOverviewUseCase.execute(organizerId, filter),
        this._earningsOverviewUseCase.execute(organizerId, filter),
        this._eventPerformanceUseCase.execute(organizerId, filter),
        this._payoutSummaryUseCase.execute(organizerId, filter),
        this._getSubscriptionSummaryUseCase.execute(organizerId, filter),
        this._getKycStatusUseCase.execute(organizerId),
      ]);

    return {
      tickets,
      earnings,
      events,
      payouts,
      subscription,
      kyc,
    };
  }
}
