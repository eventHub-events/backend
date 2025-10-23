import { EventsAdminViewResponseDTO } from "../../../../../domain/DTOs/admin/event-view/EventsAdminViewResponseDTO";

export interface IGetAllEventAdminUseCase {
  execute():Promise<EventsAdminViewResponseDTO[]>;
}