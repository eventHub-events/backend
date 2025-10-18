import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IDeleteEventUseCase } from "../../../interface/useCases/organizer/events/IDeleteEventUseCase";

export class DeleteEventUseCase implements IDeleteEventUseCase {

   constructor(
     private  _eventRepository : IEventRepository
   ){}
 async  execute(eventId: string): Promise<string> {

        await this._eventRepository.deleteEvent(eventId);
      return  "Event deleted  successfully";
  }
}