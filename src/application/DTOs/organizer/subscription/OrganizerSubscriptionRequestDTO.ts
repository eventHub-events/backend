import { SubscriptionStatus } from "../../../../domain/enums/organizer/subscription";

export interface OrganizerSubscriptionRequestDTO {
        organizerId: string,
        organizerName: string,
        organizerEmail : string,
        planId: string,
        planName: string,
        startDate: Date,
        endDate: Date,
        status?:SubscriptionStatus,
        paymentId?: string,
      
}