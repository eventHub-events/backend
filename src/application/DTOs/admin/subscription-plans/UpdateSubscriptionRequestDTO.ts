import { IPrivileges } from "../../../../infrastructure/db/models/admin/SubscriptionPrivileges";

export interface UpdateSubscriptionRequestDTO {
    name?: string;
    price?: number;
    durationInDays?: number;
    description?: string;
    isActive?: boolean;
    privileges?: IPrivileges;

}