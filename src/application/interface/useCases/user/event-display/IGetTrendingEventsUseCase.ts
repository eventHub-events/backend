import { TrendingEventDisplayResponseDTO } from "../../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";

export interface IGetTrendingEventUseCase {
   execute(): Promise<TrendingEventDisplayResponseDTO[]>;
}