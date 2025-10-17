import { IEventsEntityFactory } from "../../../application/interface/factories/organizer/IEventsEntityFactory";
import { EventEntity } from "../../../domain/entities/organizer/EventEntity";
import { EventsDbModel } from "../../../domain/types/OrganizerTypes";

export class EventEntityFactory implements IEventsEntityFactory<EventsDbModel, EventEntity> {
  
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
         tickets: dbModel.tickets,
         status: dbModel.status,
         ticketsSold: dbModel.ticketsSold,
         totalRevenue: dbModel.totalRevenue,
         platformCommission: dbModel.platformCommission,
         organizerEarnings: dbModel.organizerEarnings,
         featured: dbModel.featured,
         approved: dbModel.approved,
         flaggedReason: dbModel.flaggedReason,
         saleStartDate: dbModel.saleStartDate,
         saleEndDate: dbModel.saleEndDate,
         createdBy: dbModel.createdBy,
         tags: dbModel.tags,
         waitingListEnabled: dbModel.waitingListEnabled,
         waitingList: dbModel.waitingList,
         isBlocked: dbModel.isBlocked,
         blockedReason: dbModel.blockedReason,
         isDeleted: dbModel.isDeleted,
         viewsCount: dbModel.viewsCount,
         bookmarkCount: dbModel.bookmarkCount,
         sharesCount: dbModel.sharesCount,
         reviews: dbModel.reviews,
         averageRating: dbModel.averageRating,
         reviewCount: dbModel.reviewCount,
         createdAt: dbModel.createdAt,
         updatedAt: dbModel.updatedAt
     });
}
toDomainList(dbModel: EventsDbModel[]): EventEntity[] {
    return dbModel.map((event) => this.toDomain(event));
}
}