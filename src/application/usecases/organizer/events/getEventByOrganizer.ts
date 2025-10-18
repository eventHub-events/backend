import { EventResponseDTO } from "../../../../domain/DTOs/organizer/events/EventResponseDTO";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";
import { IGetEventByOrganizer } from "../../../interface/useCases/organizer/events/IGetEventByOrganizer";

export class GetEventByOrganizer implements IGetEventByOrganizer {
    constructor(
       private _eventRepository: IEventRepository,
       private _eventMapper: IEventMapper
    ){}
  async  execute(organizerId: string): Promise<EventResponseDTO[]> {

        const eventEntities = await this._eventRepository.findEventsByOrganizerId(organizerId);
        return this._eventMapper.toResponseDTOList(eventEntities);
    }

}