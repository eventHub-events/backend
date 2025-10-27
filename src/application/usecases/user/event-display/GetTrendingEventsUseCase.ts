import { TrendingEventDisplayResponseDTO } from "../../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { IEventDisplayMapper } from "../../../interface/mapper/user/IEventDisplayMapper";
import { IGetTrendingEventUseCase } from "../../../interface/useCases/user/event-display/IGetTrendingEventsUseCase";

export  class GetTrendingEventUseCase implements IGetTrendingEventUseCase {
  constructor(
      private _eventQueryDisplayRepository: IEventDisplayQueryRepository,
      private _eventDisplayMapper: IEventDisplayMapper
  ){}
 async  execute(): Promise<TrendingEventDisplayResponseDTO[]> {
      const events = await this._eventQueryDisplayRepository.findTrendingEvents();
      return this._eventDisplayMapper.toResponseDTOList(events);
 }
}