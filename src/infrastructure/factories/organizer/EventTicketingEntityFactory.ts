
import { IEventTicketingEntityFactory } from "../../../application/interface/factories/organizer/IEventTicketingFactory";
import { EventTicketingEntity } from "../../../domain/entities/organizer/EventTicketingEntity";
import { EventTicketingDbModel } from "../../../domain/types/OrganizerTypes";

export class EventTicketingEntityFactory implements IEventTicketingEntityFactory<EventTicketingDbModel, EventTicketingEntity>{
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
           waitingList: dbModel.waitingList

      })
  }
 toDomainList(dbModels: EventTicketingDbModel[]): EventTicketingEntity[] {
     return dbModels.map((model) => this.toDomain(model) );
 }
}