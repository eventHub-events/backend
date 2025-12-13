import {
  ITicketsOverview,
  OrganizerDashboardFilter,
} from '../../../../domain/interface/organizer-dashboard/dashboard';
import { IOrganizerDashboardRepository } from '../../../../domain/repositories/organizer/IOrganizerDashboardRepository';
import { IGetTicketsOverviewUseCase } from '../../../interface/useCases/organizer/dashboard/IGetTicketsOverviewUseCase';

export class GetTicketsOverviewUseCase implements IGetTicketsOverviewUseCase {
  constructor(private _repo: IOrganizerDashboardRepository) {}
  async execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<ITicketsOverview> {
    return this._repo.getTicketsOverview(organizerId, filter);
  }
}
