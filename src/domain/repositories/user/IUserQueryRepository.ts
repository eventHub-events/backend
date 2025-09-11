import { UserWithOrganizerProfileDTO } from "../../dtos/admin/UserWithOrganizerProfileDTO";

export interface IUserQueryRepository{
  findPendingOrganizersWithProfile():Promise<UserWithOrganizerProfileDTO[]>;
}