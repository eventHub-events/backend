import { IEventSearchCriteria } from '../../../../domain/queries/EventSearchCriteria';
import { IEventDisplayQueryRepository } from '../../../../domain/repositories/user/IEventDisplayQueryRepository';
import { TrendingEventDisplayResponseDTO } from '../../../DTOs/user/event-display/TrendingEventDisplayResponseDTO';
import { EventSearchFilterDTO } from '../../../DTOs/user/eventSearch/EventSearchFilterDTO';
import { IEventDisplayMapper } from '../../../interface/mapper/user/IEventDisplayMapper';
import { ISearchEventsUseCase } from '../../../interface/useCases/user/event-display/ISearchEventsUseCase';

export class SearchEventsUseCase implements ISearchEventsUseCase {
  constructor(
    private _repo: IEventDisplayQueryRepository,
    private _eventDisplayMapper: IEventDisplayMapper
  ) {}

  async execute(dto: EventSearchFilterDTO): Promise<{
    events: TrendingEventDisplayResponseDTO[];
    currentPage: number;
    totalPages: number;
  }> {
    const criteria: IEventSearchCriteria = {
      search: dto.search,
      title: dto.title,
      location: dto.location,
      category: dto.category,
      organizer: dto.organizer,
      page: dto.page,
      limit: dto.limit,
    };

    const result = await this._repo.searchEvents(criteria);

    return {
      events: this._eventDisplayMapper.toResponseDTOList(result.data),
      currentPage: criteria.page,
      totalPages: result.totalPages,
    };
  }
}
