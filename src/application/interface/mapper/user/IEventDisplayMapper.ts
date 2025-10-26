import { TrendingEventDisplayResponseDTO } from "../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";

export interface IEventDisplayMapper {
  toResponseDTO(data: EventDisplayEntity) : TrendingEventDisplayResponseDTO;
  toResponseDTOList(data: EventDisplayEntity[]): TrendingEventDisplayResponseDTO[];
  
}