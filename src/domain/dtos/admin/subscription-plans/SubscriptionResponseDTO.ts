import { IPrivileges } from "../../../../infrastructure/db/models/admin/SubscriptionPrivileges";

export interface SubscriptionResponseDTO {
    name: string;
    price: number;
    durationInDays: number;
    description: string;
    isActive?: boolean;
    privileges: IPrivileges;
    createdAt?: Date
}