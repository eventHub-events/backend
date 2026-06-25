import { EventStatus } from "../../../../domain/enums/organizer/events";

export interface TrendingEventDisplayResponseDTO {
  id?: string;
  title: string;
  category: string;
  images: string[];
  location: string;
  attendees?: number;
  startDate: string;
  endDate?: string;
  tags?: string[];
  status:EventStatus;
  price: number;
  ticketsLeft?: number;
  availability?: number;
  organizer?: string;
  description?: string;
}
