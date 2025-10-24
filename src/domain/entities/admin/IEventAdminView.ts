import { ILocation } from "../../valueObject/organizer/location";

export interface IEventAdminView {
  _id: string;
  title :string;
  type: string;
  category?: {
    name: string;
  };
  startDate :Date;
  endDate : Date;
  images: string[];
  organizerEmail: string;
  totalCapacity: number;
  status: string;
  approvedStatus?: string;
  featured?: boolean;
  moderation? : {
    eventApprovalStatus?: string;
    isBlocked?: boolean;
    blockedReason?: string;
  };
  ticketing?: {
     totalRevenue?: number;
     ticketsSold?: number;
     platformCommission?: number

  };
  location?: ILocation;
}