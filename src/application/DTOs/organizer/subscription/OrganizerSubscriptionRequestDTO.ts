import { SubscriptionStatus } from "../../../../domain/enums/organizer/subscription";

export interface OrganizerSubscriptionRequestDTO {
        organizerId: string;
        organizerName: string;
        organizerEmail : string;
        planId: string;
        planName: string;
        price: number;
        startDate?: Date;
        endDate?: Date;
        status?:SubscriptionStatus;
        durationInDays: number;
        payoutDelayDays: number;
        paymentId?: string,
        commissionRate?: number
      
}