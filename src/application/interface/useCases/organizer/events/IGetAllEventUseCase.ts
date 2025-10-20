import { EventResponseDTO } from "../../../../../domain/DTOs/organizer/events/EventResponseDTO";

export interface IGetAllEventUseCase {
  execute(): Promise<EventResponseDTO[]>;
}