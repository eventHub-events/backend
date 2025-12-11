import { EventResponseDTO } from "../../../DTOs/organizer/events/EventResponseDTO";
import { IEventRepository } from "../../../../domain/repositories/organizer/IEventsRepository";
import { IEventMapper } from "../../../interface/useCases/organizer/events/IEventMapper";
import { IGetEventByIdUseCase } from "../../../interface/useCases/organizer/events/IGetEventByIdUseCase";
import { ErrorMessages } from "../../../../constants/errorMessages";

export class GetEventByIdUseCase implements IGetEventByIdUseCase {
    constructor(
       private _eventRepository : IEventRepository,
       private _eventMapper: IEventMapper
    ){}

    async execute(eventId: string): Promise<EventResponseDTO> {

            const eventEntity =  await this._eventRepository.findEventById(eventId);
            if(!eventEntity) throw new Error(ErrorMessages.EVENT.NOT_FOUND);
            return this._eventMapper.toResponseDTO (eventEntity);
    }
}