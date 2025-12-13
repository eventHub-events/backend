import { ITicketTier } from '../../../../domain/valueObject/organizer/ticketTier';
import { IWaitingListEntry } from '../../../../domain/valueObject/organizer/WaitingListEntry';

export interface EventTicketingRequestDTO {
  eventId: string;
  organizerId: string;
  tickets: ITicketTier[];
  saleStartDate: Date;
  saleEndDate: Date;
  waitingListEnabled: boolean;
  waitingList?: IWaitingListEntry[];
  platformCommission?: number;
}
