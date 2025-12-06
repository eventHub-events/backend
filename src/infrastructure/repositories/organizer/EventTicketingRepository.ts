import mongoose from "mongoose";
import { IEventTicketingEntityFactory } from "../../../application/interface/factories/organizer/IEventTicketingFactory";
import { EventTicketingEntity } from "../../../domain/entities/organizer/EventTicketingEntity";
import { NotFoundError } from "../../../domain/errors/common";
import { IEventTicketingRepository } from "../../../domain/repositories/organizer/IEventTicketingRepository";
import { EventTicketingDbModel } from "../../../domain/types/OrganizerTypes";
import { EventTicketingModel, IEventTicketing } from "../../db/models/organizer/events/EventTicketingModel";
import { BaseRepository } from "../BaseRepository";
import { ErrorMessages } from "../../../constants/errorMessages";

ErrorMessages
export class EventTicketingRepository extends BaseRepository<IEventTicketing> implements IEventTicketingRepository {
  constructor(
       private _eventTicketingEntityFactory : IEventTicketingEntityFactory<EventTicketingDbModel, EventTicketingEntity>
  ){
    super(EventTicketingModel)
  }               
  async createTicketing(data: EventTicketingEntity): Promise<EventTicketingEntity> {

        const ticketingDoc = await super.create (data) as EventTicketingDbModel;
       if(!ticketingDoc) throw new Error(ErrorMessages.TICKETING.CREATION_FAILED);

    return this._eventTicketingEntityFactory.toDomain(ticketingDoc);

  }
  async updateTicketing(ticketingId: string, data: EventTicketingEntity): Promise<EventTicketingEntity> {

         const updatedDoc = await super.update(ticketingId, data) as EventTicketingDbModel;
        if(!updatedDoc) throw new Error(ErrorMessages.TICKETING.UPDATE_FAILED);

      return this._eventTicketingEntityFactory.toDomain(updatedDoc);
  }
 async updateTicketingByEventId(eventId: string, data: EventTicketingEntity): Promise<EventTicketingEntity> {

         const updatedDoc = await super.findOneAndUpdate({eventId}, data) as EventTicketingDbModel;
        if(!updatedDoc) throw new Error(ErrorMessages.TICKETING.UPDATE_FAILED);

      return this._eventTicketingEntityFactory.toDomain(updatedDoc);
  }

  async findTicketingById(ticketingId: string): Promise<EventTicketingEntity> {

         const ticketingDocs = await super.findById(ticketingId) as EventTicketingDbModel;

          if(!ticketingDocs) throw new Error(ErrorMessages.TICKETING.DETAILS_NOT_FOUND);

        return this._eventTicketingEntityFactory.toDomain(ticketingDocs);
      
   }
  async deleteTicketing(ticketingId: string): Promise<void> {

       await super.delete(ticketingId); 
  }
  async findTicketingByEventId(eventId: string) :Promise<EventTicketingEntity > {

            const ticketingDocs = await super.findOne({eventId}) as EventTicketingDbModel;
            if(!ticketingDocs) throw new  NotFoundError(ErrorMessages.TICKETING.DETAILS_NOT_FOUND)
            

     return this._eventTicketingEntityFactory.toDomain(ticketingDocs);
      

  }
  async reserveMultipleSeats(
    eventId: string,
    tickets: { name: string; quantity: number }[]
  ): Promise<boolean> {
    const eventObjectId = new mongoose.Types.ObjectId(eventId);

    for (const t of tickets) {
      // Step 1: Fetch the specific ticket info
      const event = await super.findOne(
        { eventId: eventObjectId, "tickets.name": t.name },
        { "tickets.$": 1 }
      );

      if (!event || !event.tickets?.length) {
        throw new Error(`Ticket type "${t.name}" not found`);
      }

      const ticket = event.tickets[0];
    

      // Step 2: Check if enough seats are available
      if (ticket.bookedSeats + t.quantity > ticket.totalSeats) {
        throw new Error(`Not enough seats available for "${t.name}"`);
      }

      // Step 3: Atomically reserve seats using BaseRepository.updateOne()
      const { modifiedCount } = await super.updateOne(
        {
          eventId: eventObjectId,
          "tickets.name": t.name,
          "tickets.bookedSeats": ticket.bookedSeats, // ensures concurrency safety
        },
        { $inc: { "tickets.$.bookedSeats": t.quantity } }
      );

      if (modifiedCount === 0) {
        throw new Error(`Failed to reserve seats for "${t.name}" — try again`);
      }
    }

    return true;
  }

  async releaseMultipleSeats(eventId: string, tickets:{name: string, quantity: number}[]): Promise<boolean> {

      const eventObjectId = new mongoose.Types.ObjectId(eventId);
       for(const t of tickets){
           const event = await super.findOne({
               eventId: eventObjectId,"tickets.name": t.name
           },{"tickets.$": 1});

           if(!event|| !event.tickets?.length) {
            continue;
           }
          //  const ticket = event.tickets[0];
           const {modifiedCount }  = await super.updateOne(
             {
               eventId: eventObjectId,
               "tickets.name": t.name,
               "tickets.bookedSeats" : {$gte: t.quantity},

             },
             {$inc:{"tickets.$.bookedSeats":-t.quantity}}
           );

           if(modifiedCount === 0){
              console.warn(
        `No seats released for "${t.name}" — likely already released or race condition`
      )
           }
       }
      return true
  }

}