import { EventType } from "../../../enums/organizer/events";
import { ILocation } from "../../../valueObject/organizer/location";
import { ITicketTier } from "../../../valueObject/organizer/ticketTier";

export interface EventUpdateDTO {
  
     organizerId: string;
      title?: string;
      type?: EventType;
      categoryId?: string;
      description?: string;
      location?: ILocation;
      totalCapacity?: number;
      startDate?: Date;
      endDate?: Date;
      images?: string[];
      tickets?: ITicketTier[];
      featured?: boolean;
      createdBy?: string;
      tags?: string[];
      waitingListEnabled?: boolean;
  
  }
