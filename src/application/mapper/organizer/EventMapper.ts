import { Types } from 'mongoose';
import { EventCreationRequestDTO } from '../../DTOs/organizer/events/EventCreationRequestDTO';
import { EventResponseDTO } from '../../DTOs/organizer/events/EventResponseDTO';
import { EventUpdateDTO } from '../../DTOs/organizer/events/EventUpdateDTO';
import { EventEntity } from '../../../domain/entities/organizer/EventEntity';
import { IEventMapper } from '../../interface/useCases/organizer/events/IEventMapper';
import { EventModerationEntity } from '../../../domain/entities/admin/EventModerationEntity';
import { EventApprovalStatus } from '../../../domain/enums/organizer/events';

export class EventMapper implements IEventMapper {
  toEntity(dto: EventCreationRequestDTO): EventEntity {
    return new EventEntity({
      organizerId: new Types.ObjectId(dto.organizerId),
      title: dto.title,
      type: dto.type,
      categoryId: new Types.ObjectId(dto.categoryId),
      description: dto.description,
      location: dto.location,
      totalCapacity: dto.totalCapacity,
      startDate: dto.startDate,
      endDate: dto.endDate,
      images: dto.images,
      startTime: dto.startTime,
      endTime: dto.endTime,
      approvedStatus: dto.approvedStatus,
      organizerEmail: dto.organizerEmail,
      featured: dto.featured ?? false,
      createdBy: dto.createdBy ?? '',
      tags: dto.tags ?? [],
      visibility: dto.visibility,
      category: dto.category,
    });
  }
  toEntityForUpdate(dto: EventUpdateDTO): Partial<EventEntity> {
    const { organizerId, categoryId, ...rest } = dto;

    return {
      ...rest,
      ...(organizerId && { organizerId: new Types.ObjectId(dto.organizerId) }),
      ...(categoryId && { categoryId: new Types.ObjectId(dto.categoryId) }),
    };
  }
  toResponseDTO(entity: EventEntity): EventResponseDTO {
    return {
      organizerId: entity.organizerId.toString(),
      title: entity.title,
      type: entity.type,
      categoryId: entity.categoryId.toString(),
      description: entity.description,
      location: entity.location,
      totalCapacity: entity.totalCapacity,
      startDate: entity.startDate,
      endDate: entity.endDate,
      eventId: entity.eventId?.toString(),
      startTime: entity.startTime,
      approvedStatus: entity.approvedStatus,
      endTime: entity.endTime,
      images: entity.images,
      visibility: entity.visibility,
      featured: entity.featured,
      organizerEmail: entity.organizerEmail,
      tags: entity.tags,
      status: entity.currentStatus,
      category: entity.category,
    };
  }
  toResponseDTOList(entities: EventEntity[]): EventResponseDTO[] {
    return entities.map(event => this.toResponseDTO(event));
  }
  toBlankModerationEntity(
    eventId: Types.ObjectId
  ): Partial<EventModerationEntity> {
    return {
      eventId,
      eventApprovalStatus: EventApprovalStatus.Pending,
      approved: false,
      isBlocked: false,
    };
  }
}
