import { ITicketTier } from "../../../valueObject/organizer/ticketTier";
import { IWaitingListEntry } from "../../../valueObject/organizer/WaitingListEntry";

export interface EventTicketingEditDTO {
  eventId?: string;
  organizerId?: string;
  tickets?: ITicketTier[];
  saleStartDate?: Date;
  saleEndDate?: Date;
  waitingListEnabled?: boolean;
  waitingList?: IWaitingListEntry[];
  platformCommission?: number;
}