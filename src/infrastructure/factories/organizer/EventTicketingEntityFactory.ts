import { Types } from 'mongoose';
import { IEventTicketingEntityFactory } from '../../../application/interface/factories/organizer/IEventTicketingFactory';
import { EventTicketingEntity } from '../../../domain/entities/organizer/EventTicketingEntity';
import { EventTicketingDbModel } from '../../../domain/types/OrganizerTypes';
import { EventStatus } from '../../../domain/enums/organizer/events';

export class EventTicketingEntityFactory implements IEventTicketingEntityFactory<
  EventTicketingDbModel,
  EventTicketingEntity
> {
  toDomain(dbModel: EventTicketingDbModel): EventTicketingEntity {
    return new EventTicketingEntity({
      eventId: dbModel.eventId,
      organizerId: dbModel.organizerId,
      tickets: dbModel.tickets,
      status: dbModel.status,
      saleStartDate: dbModel.saleStartDate,
      saleEndDate: dbModel.saleEndDate,
      ticketsSold: dbModel.ticketsSold,
      totalRevenue: dbModel.ticketsSold,
      platformCommission: dbModel.ticketsSold,
      organizerEarnings: dbModel.organizerEarnings,
      ticketRevenue: dbModel.ticketRevenue,
      waitingListEnabled: dbModel.waitingListEnabled,
      waitingList: dbModel.waitingList,
    });
  }
  toDomainList(dbModels: EventTicketingDbModel[]): EventTicketingEntity[] {
    return dbModels.map(model => this.toDomain(model));
  }
  createEmptyTicketing(
    eventId: string,
    organizerId: string
  ): EventTicketingEntity {
    return new EventTicketingEntity({
      eventId: new Types.ObjectId(eventId),
      organizerId: new Types.ObjectId(organizerId),
      tickets: [],
      saleStartDate: new Date(),
      saleEndDate: new Date(),
      status: EventStatus.Draft,
      ticketsSold: 0,
      totalRevenue: 0,
      platformCommission: 0,
      organizerEarnings: 0,
      ticketRevenue: {},
      waitingListEnabled: false,
      waitingList: [],
    });
  }
}
