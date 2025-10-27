import { EventDetailsResponseDTO } from "../../../../domain/DTOs/user/event-display/EventDetailsResponseDTO";
import { TrendingEventDisplayResponseDTO } from "../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { EventDetailsEntity } from "../../../../domain/entities/user/EventDetailsEntity";
import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";

export interface IEventDisplayMapper {
  toResponseDTO(data: EventDisplayEntity) : TrendingEventDisplayResponseDTO;
  toResponseDTOList(data: EventDisplayEntity[]): TrendingEventDisplayResponseDTO[];
  toEventDetailsResponseDTO(data: EventDetailsEntity): EventDetailsResponseDTO;
  
}