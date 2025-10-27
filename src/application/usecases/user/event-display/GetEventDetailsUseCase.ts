import { EventDetailsResponseDTO } from "../../../../domain/DTOs/user/event-display/EventDetailsResponseDTO";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { IEventDisplayMapper } from "../../../interface/mapper/user/IEventDisplayMapper";
import { IGetEventDetailsUseCase } from "../../../interface/useCases/user/event-display/IGetEventDetailsUseCase";

export class GetEventDetailsUseCase implements IGetEventDetailsUseCase {
  constructor(
      private _eventDisplayQueryRepository : IEventDisplayQueryRepository,
      private _eventMapper: IEventDisplayMapper
  ){}
  async execute(eventId: string): Promise<EventDetailsResponseDTO> {

      const event  = await this._eventDisplayQueryRepository.findEventById(eventId);
     
      if(!event) throw new Error("Event details not found");

    return this._eventMapper.toEventDetailsResponseDTO(event);

      

  }
}