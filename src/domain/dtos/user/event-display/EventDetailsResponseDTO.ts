import { ILocation } from "../../../valueObject/organizer/location";
import { ITicketTier } from "../../../valueObject/organizer/ticketTier";

export interface EventDetailsResponseDTO{
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
  tickets: Partial<ITicketTier>[];
}