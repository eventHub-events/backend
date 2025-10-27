import { ILocation } from "../../../valueObject/organizer/location";

export interface EventsAdminViewResponseDTO {
  id: string;
  title: string;
  type: string;
  category?: string;
  startDate: Date;
  endDate : Date;
  featured?: boolean;
  totalCapacity: number;
  organizerEmail?:string;
  approvedStatus?: string;
  images?:string[];
  eventApprovalStatus?: string;
  isBlocked?: boolean;
  blockedReason?: string;
  totalRevenue?: number;
  platformCommission?:number;
  ticketsSold?: number;
  location?: ILocation;
}