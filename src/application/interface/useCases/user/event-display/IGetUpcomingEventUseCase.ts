import { UpcomingEventsDetails } from "../../../../../domain/entities/user/UpcomingEventsDetails";

export interface IGetUpcomingEventUseCase {
  execute(): Promise<UpcomingEventsDetails[]>;
}