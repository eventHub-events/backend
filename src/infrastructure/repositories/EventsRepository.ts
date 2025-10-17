import { FilterQuery } from "mongoose";
import { EventEntity } from "../../domain/entities/organizer/EventEntity";
import { IEventRepository } from "../../domain/repositories/organizer/IEventsRepository";
import { EventModel, IEvent } from "../db/models/organizer/events/EventsModel";
import { BaseRepository } from "./BaseRepository";


export class EventRepository extends BaseRepository<IEvent> implements IEventRepository {

   constructor(
          
     ){
       super(EventModel)
    }

   async  createEvent(event: EventEntity): Promise<EventEntity> {
        
    }
   async updateEvent(eventId: string, event: Partial<EventEntity>): Promise<EventEntity | null> {
       
   }
   async DeleteEvent(eventId: string): Promise<void> {
       
   }

   async findEventsByOrganizerId(organizerId: string): Promise<EventEntity[]> {
       
   }
   async findAll(filter?: FilterQuery<IEvent>): Promise<IEvent[]> {
       
   }
   async findEventById(eventId: string): Promise<EventEntity | null> {
       
   }


  

}