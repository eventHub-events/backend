
import { TrendingEventDisplayResponseDTO } from "../../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";

export interface IGetFeaturedEventUseCase  {
  execute(): Promise<TrendingEventDisplayResponseDTO[]>
}