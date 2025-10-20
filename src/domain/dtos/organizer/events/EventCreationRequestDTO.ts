import { EventType, EventVisibility } from "../../../enums/organizer/events";
import { ILocation } from "../../../valueObject/organizer/location";
import { ITicketTier } from "../../../valueObject/organizer/ticketTier";

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
    tags?:string[];
    visibility?:EventVisibility;
    organizerEmail? : string

}