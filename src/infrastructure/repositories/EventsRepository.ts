import { FilterQuery } from "mongoose";
import { EventEntity } from "../../domain/entities/organizer/EventEntity";
import { IEventRepository } from "../../domain/repositories/organizer/IEventsRepository";
import { EventModel, IEvent } from "../db/models/organizer/events/EventsModel";
import { BaseRepository } from "./BaseRepository";
import { IEventsEntityFactory } from "../../application/interface/factories/organizer/IEventsEntityFactory";
import { EventsDbModel } from "../../domain/types/OrganizerTypes";


export class EventRepository extends BaseRepository<IEvent> implements IEventRepository {

   constructor(
           private  _eventEntityMapper: IEventsEntityFactory<EventsDbModel, EventEntity>
     ){
       super(EventModel)
    }

   async  createEvent(event: EventEntity): Promise<EventEntity> {
        const  result = await super.create(event) as EventsDbModel;
          if(!result) throw new Error("Event creation failed");
      return  this._eventEntityMapper.toDomain(result);
    }
   async updateEvent(eventId: string, event: Partial<EventEntity>): Promise<EventEntity | null> {

         const updatedDoc = await super.update(eventId,event) as EventsDbModel;
         if(!updatedDoc) throw new Error("Document update failed");
       return this._eventEntityMapper.toDomain(updatedDoc);
   }
   async deleteEvent(eventId: string): Promise< void > {
        await super.delete(eventId);
      
   }

   async findEventsByOrganizerId(organizerId: string): Promise<EventEntity[]> {

      const eventsDoc = await super.findAll({organizerId}) as EventsDbModel[];
        if(!eventsDoc || eventsDoc.length=== 0) throw new Error("Events not found");
      return this._eventEntityMapper.toDomainList(eventsDoc);

   }
   async findAllEvents(): Promise<EventEntity[]> {
      const eventDocs = await super.findAll() as EventsDbModel[];
       if(!eventDocs || EventSource.length === 0)  throw new Error("Events not found");

        return this._eventEntityMapper.toDomainList(eventDocs);
       
   }
   async findEventById(eventId: string): Promise<EventEntity | null> {

       const eventDoc = await super.findById(eventId) as EventsDbModel;
       if(!eventDoc || EventSource.length === 0) throw new Error("Event not found");
        return this._eventEntityMapper.toDomain(eventDoc);
       
   }


  

}