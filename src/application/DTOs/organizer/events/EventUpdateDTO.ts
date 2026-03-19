import {
  EventApprovalStatus,
  EventStatus,
  EventType,
  EventVisibility,
} from '../../../../domain/enums/organizer/events';
import { ILocation } from '../../../../domain/valueObject/organizer/location';
import { ITicketTier } from '../../../../domain/valueObject/organizer/ticketTier';

// export interface EventUpdateDTO {
//   organizerId?: string;
//   title?: string;
//   type?: EventType;
//   categoryId?: string;
//   description?: string;
//   location?: ILocation;
//   totalCapacity?: number;
//   status?: EventStatus;
//   approvedStatus: EventApprovalStatus;
//   startDate?: Date;
//   endDate?: Date;
//   startTime?: string;
//   endTime?: string;
//   images?: string[];
//   tickets?: ITicketTier[];
//   featured?: boolean;
//   createdBy?: string;
//   tags?: string[];
//   waitingListEnabled?: boolean;
// }

export interface EventUpdateDTO {
  organizerId: string;
    title: string;
    type: EventType;
    categoryId: string;
    description: string;
    location: ILocation;
    totalCapacity: number;
    startDate: Date;
    endDate: Date;
    images: string[];
    startTime?: string;
    endTime?: string;
    featured?: boolean;
    createdBy?: string;
    approvedStatus: EventApprovalStatus;
    tags?: string[];
    stripeAccountId: string;
    visibility?: EventVisibility;
    organizerEmail?: string;
    saleStartDate: Date;        
    saleEndDate: Date;
    tickets: ITicketTier[];
    waitingListEnabled: boolean; 
    organizerPaymentId?: string;
    category?: string;
}
