import { IEventTicketingEntityFactory } from "../../../application/interface/factories/organizer/IEventTicketingFactory";
import { EventTicketingEntity } from "../../../domain/entities/organizer/EventTicketingEntity";
import { IEventTicketingRepository } from "../../../domain/repositories/organizer/IEventTicketingRepository";
import { EventTicketingDbModel } from "../../../domain/types/OrganizerTypes";
import { EventTicketingModel, IEventTicketing } from "../../db/models/organizer/events/EventTicketingModel";
import { BaseRepository } from "../BaseRepository";

export class EventTicketingRepository extends BaseRepository<IEventTicketing> implements IEventTicketingRepository {
  constructor(
       private _eventTicketingEntityFactory : IEventTicketingEntityFactory<EventTicketingDbModel, EventTicketingEntity>
  ){
    super(EventTicketingModel)
  }

  async createTicketing(data: EventTicketingEntity): Promise<EventTicketingEntity> {

        const ticketingDoc = await super.create (data) as EventTicketingDbModel;
       if(!ticketingDoc) throw new Error("Ticketing details creation  failed");

    return this._eventTicketingEntityFactory.toDomain(ticketingDoc);

  }
  async updateTicketing(ticketingId: string, data: EventTicketingEntity): Promise<EventTicketingEntity> {

         const updatedDoc = await super.update(ticketingId, data) as EventTicketingDbModel;
        if(!updatedDoc) throw new Error("Ticketing details creation  failed");

      return this._eventTicketingEntityFactory.toDomain(updatedDoc);
  }

  async findTicketingById(ticketingId: string): Promise<EventTicketingEntity> {

         const ticketingDocs = await super.findById(ticketingId) as EventTicketingDbModel;

          if(!ticketingDocs) throw new Error("Ticketing Details not found");

        return this._eventTicketingEntityFactory.toDomain(ticketingDocs);
      
   }
  async deleteTicketing(ticketingId: string): Promise<void> {

       await super.delete(ticketingId); 
  }

}