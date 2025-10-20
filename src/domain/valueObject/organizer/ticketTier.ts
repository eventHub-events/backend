import { TicketStatus } from "../../enums/organizer/events";

export interface ITicketTier {
  name: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  description?: string;
  status: TicketStatus;
  benefits: string[];
  saleStartDate?: Date;
  saleEndDate?: Date;
  maxTicketPerUser?: number;
  isRefundable?: boolean

}