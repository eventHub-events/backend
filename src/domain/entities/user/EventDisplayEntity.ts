import { EventStatus } from "../../enums/organizer/events";

export interface EventDisplayEntity {
  _id?: string;
  title: string;
  category: string;
  images: string[];
  location: string;
  startDate: string;
  endDate?:string;
  tags?: string[];
  attendees?: number;
  price: number;
  status:EventStatus;
  description?: string;
  organizer?: string;
  ticketsLeft?: number;
  availability?: number;
}
