import { IEventsEntityFactory } from '../../../application/interface/factories/organizer/IEventsEntityFactory';
import { EventEntity } from '../../../domain/entities/organizer/EventEntity';
import { EventsDbModel } from '../../../domain/types/OrganizerTypes';

export class EventEntityFactory implements IEventsEntityFactory<
  EventsDbModel,
  EventEntity
> {
  toDomain(dbModel: EventsDbModel): EventEntity {
    return new EventEntity({
      organizerId: dbModel.organizerId,
      title: dbModel.title,
      type: dbModel.type,
      categoryId: dbModel.categoryId,
      description: dbModel.description,
      location: dbModel.location,
      totalCapacity: dbModel.totalCapacity,
      startDate: dbModel.startDate,
      endDate: dbModel.endDate,
      images: dbModel.images,
      eventId: dbModel._id,
      status: dbModel.status,
      startTime: dbModel.startTime,
      endTime: dbModel.endTime,
      ticketsSold: dbModel.ticketsSold,
      featured: dbModel.featured,
      createdBy: dbModel.createdBy,
      tags: dbModel.tags,
      approvedStatus: dbModel.approvedStatus,
      isDeleted: dbModel.isDeleted,
      reviews: dbModel.reviews,
      createdAt: dbModel.createdAt,
      updatedAt: dbModel.updatedAt,
      visibility: dbModel.visibility,
      organizerEmail: dbModel.organizerEmail,
      category: dbModel.category,
    });
  }
  toDomainList(dbModel: EventsDbModel[]): EventEntity[] {
    return dbModel.map(event => this.toDomain(event));
  }
}
