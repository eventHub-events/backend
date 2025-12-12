import { OrganizerDashboardFilter, IOrganizerPayoutSummary } from "../../../../domain/interface/organizer-dashboard/dashboard";
import { IOrganizerDashboardRepository } from "../../../../domain/repositories/organizer/IOrganizerDashboardRepository";
import { IGetPayoutSummaryUseCase } from "../../../interface/useCases/organizer/dashboard/IGetPayoutSummaryUseCase";

export class GetPayoutSummaryUseCase implements IGetPayoutSummaryUseCase {
  constructor(
      private _repo : IOrganizerDashboardRepository
  ){}
  async execute(organizerId: string, filter?: OrganizerDashboardFilter): Promise<IOrganizerPayoutSummary> {
      return this._repo.getPayoutSummary(organizerId,filter);
  }
}