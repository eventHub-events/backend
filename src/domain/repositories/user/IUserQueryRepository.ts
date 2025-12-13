import { OrganizerProfileWithUser } from '../../types/OrganizerTypes';

export interface IUserQueryRepository {
  findPendingOrganizersWithProfile(): Promise<OrganizerProfileWithUser[]>;
}
