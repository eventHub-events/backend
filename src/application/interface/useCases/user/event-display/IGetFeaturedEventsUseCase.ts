
import { TrendingEventDisplayResponseDTO } from "../../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO";

export interface IGetFeaturedEventUseCase  {
  execute(): Promise<TrendingEventDisplayResponseDTO[]>
}