import {
  IEarningsOverview,
  OrganizerDashboardFilter,
} from '../../../../domain/interface/organizer-dashboard/dashboard';
import { IOrganizerDashboardRepository } from '../../../../domain/repositories/organizer/IOrganizerDashboardRepository';
import { IGetEarningsOverviewUseCase } from '../../../interface/useCases/organizer/dashboard/IGetEarningsOverviewUseCase';

export class GetEarningsOverviewUseCase implements IGetEarningsOverviewUseCase {
  constructor(private _repo: IOrganizerDashboardRepository) {}
  async execute(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IEarningsOverview> {
    return this._repo.getEarningsOverview(organizerId, filter);
  }
}
