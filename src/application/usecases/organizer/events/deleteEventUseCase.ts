import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IDeleteEventUseCase } from "../../../interface/useCases/organizer/events/IDeleteEventUseCase";

export class DeleteEventUseCase implements IDeleteEventUseCase {

   constructor(
     private  _eventRepository : IEventRepository
   ){}
 async  execute(eventId: string): Promise<string> {
  console.log("eventId", eventId)
        const eventEntity= await this._eventRepository.findEventById(eventId);
        if(!eventEntity) throw new Error("event not found")
          eventEntity.delete();
        console.log("ee",eventEntity)
        
        await this._eventRepository.updateEvent(eventId,eventEntity);
      return  "Event deleted  successfully";
  }
}