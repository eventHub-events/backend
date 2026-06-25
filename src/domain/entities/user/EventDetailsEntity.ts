import { EventStatus } from '../../enums/organizer/events';
import { ILocation } from '../../valueObject/organizer/location';
import { ITicketTier } from '../../valueObject/organizer/ticketTier';

export interface EventDetailsEntity {
  _id: string;
  title: string;
  images: string[];
  description: string;
  startDate: string;
  endDate?:string;
  status:EventStatus;
  startTime:string;
  endTime:string;
  tags: string[];
  category: string;
  venue: string;
  location?: ILocation;
  totalCapacity?: number;
  tickets: Partial<ITicketTier>[];
  organizerName: string;
  stripeAccountId: string;
  organizerId: string;
  organizerStripeAccountId: string;
}
