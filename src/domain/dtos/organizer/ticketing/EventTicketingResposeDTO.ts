import { EventStatus } from "../../../enums/organizer/events";
import { ITicketTier } from "../../../valueObject/organizer/ticketTier";
import { IWaitingListEntry } from "../../../valueObject/organizer/WaitingListEntry";

export interface EventTicketingResponseDTO {
  eventId: string;
    organizerId: string;
    tickets: ITicketTier[];
    saleStartDate: Date;
    saleEndDate: Date;
    id: string;
    status: EventStatus;
    platformCommission?: number;
    ticketsSold?: number;
    totalRevenue?: number;
    organizerEarnings?: number;
    ticketRevenue?:  {[tierName: string]:number};
    waitingListEnabled?: boolean;
    waitingList? :IWaitingListEntry[];
}