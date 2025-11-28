import { EventApprovalStatus, EventType, EventVisibility } from "../../../../domain/enums/organizer/events";
import { ILocation } from "../../../../domain/valueObject/organizer/location";
import { ITicketTier } from "../../../../domain/valueObject/organizer/ticketTier";

export interface EventCreationRequestDTO {
    organizerId: string;
    title: string;
    type: EventType;
    categoryId: string;
    description: string;
    location:ILocation;
    totalCapacity: number;
    startDate: Date;
    endDate: Date;
    images: string[];
    startTime?: string;
    endTime?: string;
    featured?: boolean;
    createdBy?: string;
    approvedStatus:EventApprovalStatus;
    tags?:string[];
    visibility?:EventVisibility;
    organizerEmail? : string;
    organizerPaymentId?: string;
    category?:string;

}