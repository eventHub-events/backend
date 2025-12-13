import { TrendingEventDisplayResponseDTO } from '../../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO';

export interface IGetTrendingEventUseCase {
  execute(): Promise<TrendingEventDisplayResponseDTO[]>;
}
