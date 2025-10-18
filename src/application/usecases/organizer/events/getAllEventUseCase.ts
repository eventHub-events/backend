import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";
import { IGetAllEventUseCase } from "../../../interface/useCases/organizer/events/IGetAllEventUseCase";

export class GetAllEventUseCase implements IGetAllEventUseCase {
  constructor(
      private _eventRepository : IEventRepository,
      private _eventMapper: IEventMapper

  ){}
  async execute(): Promise<EventResponseDTO[]> {
     const eventEntities = await this._eventRepository.findAllEvents();
     return this._eventMapper.toResponseDTOList(eventEntities);
      
  }
}