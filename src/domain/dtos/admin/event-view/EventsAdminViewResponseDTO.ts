import { ILocation } from "../../../valueObject/organizer/location";

export interface EventsAdminViewResponseDTO {
  id: string;
  title: string;
  type: string;
  category?: string;
  startDate: Date;
  endDate : Date;
  featured?: boolean;
  eventApprovalStatus?: string;
  isBlocked?: boolean;
  blockedReason?: string;
  totalRevenue?: number;
  ticketsSold?: number;
  location?: ILocation;
}