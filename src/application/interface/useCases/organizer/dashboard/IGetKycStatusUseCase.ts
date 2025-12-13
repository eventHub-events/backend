import { IOrganizerKycStatus } from '../../../../../domain/interface/organizer-dashboard/dashboard';

export interface IGetKycStatusUseCae {
  execute(organizerId: string): Promise<IOrganizerKycStatus>;
}
