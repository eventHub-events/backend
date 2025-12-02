import { EventFilterDTO } from "../../../../DTOs/user/event-display/EventFilterDTO";
import { TrendingEventDisplayResponseDTO } from "../../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO";


export interface IGetAllFeaturedEventUseCase {
   execute(filters :EventFilterDTO) :Promise<{
     events: TrendingEventDisplayResponseDTO[];
     currentPage : number;
     totalPages :number;
   }>;
}