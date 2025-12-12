import { OrganizerDashboardFilter, IOrganizerEventPerformance } from "../../../../domain/interface/organizer-dashboard/dashboard";
import { IOrganizerDashboardRepository } from "../../../../domain/repositories/organizer/IOrganizerDashboardRepository";
import { IGetEventPerformanceUseCase } from "../../../interface/useCases/organizer/dashboard/IGetEventPerformanceUseCase";

export class GetEarningsPerformanceUseCase implements IGetEventPerformanceUseCase {

  constructor(
      private _repo : IOrganizerDashboardRepository
  ){}
  async execute(organizerId: string, filter?: OrganizerDashboardFilter): Promise<IOrganizerEventPerformance> {
      return this._repo.getEventPerformance(organizerId, filter);
  }
}