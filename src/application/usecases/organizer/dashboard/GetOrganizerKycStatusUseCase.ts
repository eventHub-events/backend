import { IOrganizerKycStatus } from "../../../../domain/interface/organizer-dashboard/dashboard";
import { IOrganizerDashboardRepository } from "../../../../domain/repositories/organizer/IOrganizerDashboardRepository";
import { IGetKycStatusUseCae } from "../../../interface/useCases/organizer/dashboard/IGetKycStatusUseCase";

export class GetKycStatusUseCase implements IGetKycStatusUseCae {
  constructor(
     private _repo : IOrganizerDashboardRepository
  ){}
  async execute(organizerId: string): Promise<IOrganizerKycStatus> {
      return this._repo.getKycStatus(organizerId);
  }
}