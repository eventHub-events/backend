
import { EventsAdminViewResponseDTO } from "../../../domain/DTOs/admin/event-view/EventsAdminViewResponseDTO";
import { IEventAdminView } from "../../../domain/entities/admin/IEventAdminView";
import { IEventAdminViewMapper } from "../../interface/mapper/admin/IEventAdminViewMapper";

export class EventAdminViewMapper implements IEventAdminViewMapper {
  toResponseDto(data: IEventAdminView): EventsAdminViewResponseDTO {
      return {
        id: data._id,
        title: data.title,
        type: data.type,
        category: data.category?.name,
        startDate: data.startDate,
        endDate : data.endDate,
        featured : data.featured,
        eventApprovalStatus: data.moderation?.eventApprovalStatus,
        isBlocked: data.moderation?.isBlocked,
        blockedReason: data.moderation?.blockedReason,
        totalRevenue : data.ticketing?.totalRevenue,
        ticketsSold: data.ticketing?.ticketsSold,
        location: data.location
      }
  }
  toResponseDtoList(data: IEventAdminView[]): EventsAdminViewResponseDTO[] {
      return data.map((d) => this.toResponseDto(d));
  }
}