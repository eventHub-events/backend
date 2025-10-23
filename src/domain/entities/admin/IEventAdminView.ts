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
  status: string;
  ApprovedStatus?: string;
  featured?: boolean;
  moderation? : {
    eventApprovalStatus?: string;
    isBlocked?: boolean;
    blockedReason?: string;
  };
  ticketing?: {
     totalRevenue?: number;
     ticketsSold?: number;

  };
  location?: ILocation;
}