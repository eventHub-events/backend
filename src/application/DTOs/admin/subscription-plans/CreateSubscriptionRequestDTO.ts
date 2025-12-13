import { IPrivileges } from '../../../../infrastructure/db/models/admin/SubscriptionPrivileges';

export interface CreateSubscriptionRequestRequestDTO {
  name: string;
  price: number;
  durationInDays: number;
  description: string;
  privileges: IPrivileges;
  isActive?: boolean;
}
