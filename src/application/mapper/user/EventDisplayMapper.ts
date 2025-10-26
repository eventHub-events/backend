import { TrendingEventDisplayResponseDTO } from "../../../domain/DTOs/user/event-display/TrendingEventDisplayResponseDTO";
import { EventDisplayEntity } from "../../../domain/entities/user/EventDisplayEntity";
import { IEventDisplayMapper } from "../../interface/mapper/user/IEventDisplayMapper";

export class EventDisplayMapper implements IEventDisplayMapper {
  toResponseDTO(data: EventDisplayEntity): TrendingEventDisplayResponseDTO {
      return {
        id: data._id?.toString(),
        startDate: new Date(data.startDate).toLocaleDateString("en-GB",{
                        day:"2-digit",
                        month: "short",
                        year :"numeric"
                        }),
         category: data.category,
         images: data.images,
         location: data.location,
         tags: data.tags,
         attendees: data.attendees,
         price: data.price,
         title: data.title,
         description: data.description,
         organizer: data.organizer,
         availability: data.availability,
         ticketsLeft: data.ticketsLeft




      }
  }
toResponseDTOList(data: EventDisplayEntity[]): TrendingEventDisplayResponseDTO[] {
    return data.map((d) => this.toResponseDTO(d));
}
}