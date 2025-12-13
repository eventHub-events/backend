import { EventDetailsResponseDTO } from '../../DTOs/user/event-display/EventDetailsResponseDTO';
import { TrendingEventDisplayResponseDTO } from '../../DTOs/user/event-display/TrendingEventDisplayResponseDTO';
import { EventDetailsEntity } from '../../../domain/entities/user/EventDetailsEntity';
import { EventDisplayEntity } from '../../../domain/entities/user/EventDisplayEntity';
import { IEventDisplayMapper } from '../../interface/mapper/user/IEventDisplayMapper';

export class EventDisplayMapper implements IEventDisplayMapper {
  toResponseDTO(data: EventDisplayEntity): TrendingEventDisplayResponseDTO {
    return {
      id: data._id?.toString(),
      startDate: new Date(data.startDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
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
      ticketsLeft: data.ticketsLeft,
    };
  }
  toResponseDTOList(
    data: EventDisplayEntity[]
  ): TrendingEventDisplayResponseDTO[] {
    return data.map(d => this.toResponseDTO(d));
  }
  toEventDetailsResponseDTO(data: EventDetailsEntity): EventDetailsResponseDTO {
    return {
      id: data._id.toString(),
      title: data.title,
      description: data.description,
      venue: data.venue,
      tags: data.tags,
      images: data.images,
      totalCapacity: data.totalCapacity,
      organizerId: data.organizerId,
      organizerStripeAccountId: data.organizerStripeAccountId,
      category: data.category,
      organizerName: data.organizerName,
      startDate: new Date(data.startDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      location: {
        address: data.location?.address,
        state: data.location?.state,
        city: data.location?.city,
        country: data.location?.country,
      },
      tickets: data.tickets?.map(t => {
        return {
          name: t.name,
          price: t.price,
          totalSeats: t.totalSeats,
          bookedSeats: t.bookedSeats,
          description: t.description,
          benefits: t.benefits,
          maxTicketPerUser: t.maxTicketPerUser,
          isRefundable: t.isRefundable,
        };
      }),
    };
  }
}
