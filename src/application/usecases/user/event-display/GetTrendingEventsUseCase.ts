import { TrendingEventDisplayResponseDTO } from "../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { IGetTrendingEventUseCase } from "../../../interface/useCases/user/event-dispaly/IGetTrendingEventsUseCase";

export  class GetTrendingEventUseCase implements IGetTrendingEventUseCase {
  constructor(
      private _eventQueryDisplayRepository: IEventDisplayQueryRepository
  ){}
 async  execute(): Promise<TrendingEventDisplayResponseDTO[]> {
      const events = await this._eventQueryDisplayRepository.findTrendingEvents();
      return events
 }
}