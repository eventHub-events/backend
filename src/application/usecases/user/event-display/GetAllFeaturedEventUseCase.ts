import { EventFilterDTO } from '../../../DTOs/user/event-display/EventFilterDTO';
import { TrendingEventDisplayResponseDTO } from '../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO';
import { IEventDisplayQueryRepository } from '../../../../domain/repositories/user/IEventDisplayQueryRepository';
import { IEventDisplayMapper } from '../../../interface/mapper/user/IEventDisplayMapper';
import { IGetAllFeaturedEventUseCase } from '../../../interface/useCases/user/event-display/IGetAllFeaturedEventUseCase';

export class GetAllFeaturedEventUseCase implements IGetAllFeaturedEventUseCase {
  constructor(
    private readonly _eventDisplayQueryRepository: IEventDisplayQueryRepository,
    private _eventDisplayMapper: IEventDisplayMapper
  ) {}

  async execute(filters: EventFilterDTO): Promise<{
    events: TrendingEventDisplayResponseDTO[];
    currentPage: number;
    totalPages: number;
  }> {
    const { data, totalPages } =
      await this._eventDisplayQueryRepository.findFeaturedEvents(filters);
    const page = filters.page ?? 1;
    const events = this._eventDisplayMapper.toResponseDTOList(data);

    return {
      events,
      currentPage: page,
      totalPages,
    };
  }
}
