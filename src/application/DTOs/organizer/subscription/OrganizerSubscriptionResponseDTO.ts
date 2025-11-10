import { SubscriptionStatus } from "../../../../domain/enums/organizer/subscription";

export interface OrganizerSubscriptionResponseDTO {
          organizerId: string,
          organizerName: string,
          organizerEmail : string,
          planId: string,
          planName: string,
          startDate?: Date,
          endDate?: Date,
          status?:SubscriptionStatus,
          paymentId?: string,
          id?: string
}