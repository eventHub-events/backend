import { EventStatus } from '../../../../domain/enums/organizer/events';
import { ITicketTier } from '../../../../domain/valueObject/organizer/ticketTier';
import { IWaitingListEntry } from '../../../../domain/valueObject/organizer/WaitingListEntry';

export interface EventTicketingResponseDTO {
  eventId: string;
  organizerId: string;
  tickets: ITicketTier[];
  saleStartDate: Date;
  saleEndDate: Date;
  id?: string;
  status?: EventStatus;
  platformCommission?: number;
  ticketsSold?: number;
  totalRevenue?: number;
  organizerEarnings?: number;
  ticketRevenue?: { [tierName: string]: number };
  waitingListEnabled?: boolean;
  waitingList?: IWaitingListEntry[];
}
