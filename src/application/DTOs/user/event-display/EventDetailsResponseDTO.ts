import { EventStatus } from '../../../../domain/enums/organizer/events';
import { ILocation } from '../../../../domain/valueObject/organizer/location';
import { ITicketTier } from '../../../../domain/valueObject/organizer/ticketTier';

export interface EventDetailsResponseDTO {
  id: string;
  title: string;
  description: string;
  venue: string;
  location: Partial<ILocation>;
  tags?: string[];
  images: string[];
  category: string;
  organizerName: string;
  totalCapacity?: number;
  startDate: string;
  endDate?:string;
  status:EventStatus;
  startTime:string;
  endTime:string;
  organizerId: string;
  stripeAccountId: string;
  organizerStripeAccountId: string;
  tickets: Partial<ITicketTier>[];
}
