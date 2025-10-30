import { EventFilterDTO } from "../../../../../domain/DTOs/user/event-display/EventFilterDTO";
import { TrendingEventDisplayResponseDTO } from "../../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { EventDisplayEntity } from "../../../../../domain/entities/user/EventDisplayEntity";

export interface IGetAllFeaturedEventUseCase {
   execute(filters :EventFilterDTO) :Promise<{
     events: TrendingEventDisplayResponseDTO[];
     currentPage : number;
     totalPages :number;
   }>;
}