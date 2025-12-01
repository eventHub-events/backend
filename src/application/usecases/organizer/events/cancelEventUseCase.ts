import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { ICancelEventUseCase } from "../../../interface/useCases/organizer/events/ICancelEventUseCase";

export class CancelEventUseCase implements ICancelEventUseCase {
  constructor(
        private _eventRepository: IEventRepository
  ){}

 async  execute(eventId: string): Promise<string> {

      const eventEntity = await this._eventRepository.findEventById(eventId);
      if(!eventEntity) throw new Error("Event not found");

      eventEntity.cancel();

      await this._eventRepository.updateEvent(eventId, eventEntity);

     return "Event cancelled successfully"

  }
}