import { EventFilterDTO } from "../../../../../domain/DTOs/user/event-display/EventFilterDTO";
import { EventDisplayEntity } from "../../../../../domain/entities/user/EventDisplayEntity";

export interface IGetAllFeaturedEventUseCase {
   execute(filters :EventFilterDTO) :Promise<{
     data:EventDisplayEntity[];
     currentPage : number;
     totalPages :number;
   }>;
}