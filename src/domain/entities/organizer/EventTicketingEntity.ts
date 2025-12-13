import { Types } from 'mongoose';
import { ITicketTier } from '../../valueObject/organizer/ticketTier';
import { EventStatus } from '../../enums/organizer/events';
import { IWaitingListEntry } from '../../valueObject/organizer/WaitingListEntry';

export class EventTicketingEntity {
  public readonly eventId: Types.ObjectId;
  public readonly organizerId: Types.ObjectId;
  public tickets: ITicketTier[];
  public status?: EventStatus;
  public saleStartDate: Date;
  public saleEndDate: Date;
  public ticketsSold?: number;
  public totalRevenue?: number;
  public platformCommission?: number;
  public organizerEarnings?: number;
  public ticketRevenue?: { [tierName: string]: number };
  public waitingListEnabled?: boolean;
  public waitingList?: IWaitingListEntry[];
  public id?: Types.ObjectId;

  constructor(props: {
    eventId: Types.ObjectId;
    organizerId: Types.ObjectId;
    tickets: ITicketTier[];
    status?: EventStatus;
    saleStartDate: Date;
    saleEndDate: Date;
    ticketsSold?: number;
    totalRevenue?: number;
    id?: Types.ObjectId;
    platformCommission?: number;
    organizerEarnings?: number;
    ticketRevenue?: { [tierName: string]: number };
    waitingListEnabled?: boolean;
    waitingList?: IWaitingListEntry[];
  }) {
    this.eventId = new Types.ObjectId(props.eventId);
    this.organizerId = new Types.ObjectId(props.organizerId);
    this.tickets = props.tickets;
    this.status = props.status;
    this.saleStartDate = props.saleStartDate;
    this.saleEndDate = props.saleEndDate;
    this.ticketsSold = props.ticketsSold;
    this.totalRevenue = props.totalRevenue;
    this.id = props.id;
    this.platformCommission = props.platformCommission;
    this.organizerEarnings = props.organizerEarnings;
    this.ticketRevenue = props.ticketRevenue;
    this.waitingListEnabled = props.waitingListEnabled;
    this.waitingList = props.waitingListEnabled ? props.waitingList || [] : [];

    if (this.saleEndDate < this.saleStartDate) {
      throw new Error('Sale end date cannot be earlier than sale start date');
    }
    if (!this.tickets || this.tickets.length === 0) {
      throw new Error('At least one ticket tier must be defined');
    }
  }
  update(updatedData: Partial<EventTicketingEntity>): EventTicketingEntity {
    Object.assign(this, updatedData);
    return this;
  }
}
