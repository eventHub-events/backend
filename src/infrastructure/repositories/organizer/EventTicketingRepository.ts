import mongoose from "mongoose";
import { IEventTicketingEntityFactory } from "../../../application/interface/factories/organizer/IEventTicketingFactory";
import { EventTicketingEntity } from "../../../domain/entities/organizer/EventTicketingEntity";
import { NotFoundError } from "../../../domain/errors/common";
import { IEventTicketingRepository } from "../../../domain/repositories/organizer/IEventTicketingRepository";
import { EventTicketingDbModel } from "../../../domain/types/OrganizerTypes";
import { EventTicketingModel, IEventTicketing } from "../../db/models/organizer/events/EventTicketingModel";
import { BaseRepository } from "../BaseRepository";
import { TicketRequest } from "../../../domain/DTOs/user/booking/TicketReqest";

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
 async updateTicketingByEventId(eventId: string, data: EventTicketingEntity): Promise<EventTicketingEntity> {

         const updatedDoc = await super.findOneAndUpdate({eventId}, data) as EventTicketingDbModel;
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
  async findTicketingByEventId(eventId: string) :Promise<EventTicketingEntity > {

            const ticketingDocs = await super.findOne({eventId}) as EventTicketingDbModel;
            if(!ticketingDocs) throw new  NotFoundError("Ticketing Details not found")
            

     return this._eventTicketingEntityFactory.toDomain(ticketingDocs);
      

  }
  async reserveMultipleSeats(eventId: string, tickets:TicketRequest[]) : Promise<boolean> {
     const session = await mongoose. startSession();
      session.startTransaction();
      try{
         for( const t of tickets) {
            const result = await super.findOneAndUpdate({
              eventId,
              "tickets.name" : t.name,
              $expr: {$lt:["tickets.bookedSeats", "tickets.totalSeats"]},
            },
              {$inc:{"tickets.$.bookedSeats": t.quantity}},
              {session}
              
            );
            if(result=== null){
              throw new Error(`not enough seats for${t.name}`)
            }
         }
         await session.commitTransaction();
         session.endSession();
         return true;
      }catch(err) {
         await session.abortTransaction();
         session.endSession();
         return false
      }
  }
}