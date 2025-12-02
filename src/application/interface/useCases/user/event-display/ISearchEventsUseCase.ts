import { TrendingEventDisplayResponseDTO } from "../../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { EventSearchFilterDTO } from "../../../../DTOs/user/eventSearch/EventSearchFilterDTO";

export interface ISearchEventsUseCase {
  execute(dto: EventSearchFilterDTO) : Promise<{ events: TrendingEventDisplayResponseDTO[];  currentPage: number; totalPages: number; }>;
}