import { EventResponseDTO } from "../../../../DTOs/organizer/events/EventResponseDTO";

export interface IGetAllEventUseCase {
  execute(): Promise<EventResponseDTO[]>;
}