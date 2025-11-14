import { ILocation } from "../../valueObject/organizer/location";
import { ITicketTier } from "../../valueObject/organizer/ticketTier";

export interface EventDetailsEntity {
  _id: string;
  title: string;
  images: string[];
  description: string;
  startDate: string;
  tags:string[];
  category: string;
   venue: string;
   location?:ILocation;
   totalCapacity?: number;
   tickets: Partial<ITicketTier>[];
   organizerName: string,
   organizerId: string,
   organizerStripeAccountId: string
}