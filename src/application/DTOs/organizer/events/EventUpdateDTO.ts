import { EventApprovalStatus, EventStatus, EventType } from "../../../../domain/enums/organizer/events";
import { ILocation } from "../../../../domain/valueObject/organizer/location";
import { ITicketTier } from "../../../../domain/valueObject/organizer/ticketTier";

export interface EventUpdateDTO {
  
     organizerId?: string;
      title?: string;
      type?: EventType;
      categoryId?: string;
      description?: string;
      location?: ILocation;
      totalCapacity?: number;
      status?:EventStatus;
      approvedStatus: EventApprovalStatus;
      startDate?: Date;
      endDate?: Date;
      startTime?: string;
      endTime?: string;
      images?: string[];
      tickets?: ITicketTier[];
      featured?: boolean;
      createdBy?: string;
      tags?: string[];
      waitingListEnabled?: boolean;
  
  }
