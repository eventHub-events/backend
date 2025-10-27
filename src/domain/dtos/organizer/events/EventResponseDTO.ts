import { EventApprovalStatus, EventStatus, EventType, EventVisibility } from "../../../enums/organizer/events";
import { ILocation } from "../../../valueObject/organizer/location";
import { ITicketTier } from "../../../valueObject/organizer/ticketTier";

export interface EventResponseDTO {
  organizerId: string;
  title: string;
  type: EventType;
  categoryId: string;
  description: string;
  location: ILocation;
  totalCapacity: number;
  startDate: Date;
  endDate: Date;
  eventId?: string;
  images: string[];
  startTime?: string;
  endTime?: string;
  organizerEmail?: string;
  approvedStatus?: EventApprovalStatus;
  featured?: boolean;
  visibility?:EventVisibility;
  tags?: string[];
  status?: EventStatus;



}