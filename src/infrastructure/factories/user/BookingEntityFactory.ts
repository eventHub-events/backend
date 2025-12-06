import { IBookingEntityFactory } from "../../../application/interface/factories/user/IBookingEntityFactory";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { BookingDbModel } from "../../../domain/types/UserTypes";

export class BookingEntityFactory implements IBookingEntityFactory<BookingDbModel , BookingEntity> {

toDomain(dbModel: BookingDbModel): BookingEntity {
    return new BookingEntity({
      id: dbModel._id,
      status: dbModel.status,
      organizerName: dbModel.organizerName,
      userId: dbModel.userId,
      eventId: dbModel.eventId,
      tickets: dbModel.tickets,
      eventDate : dbModel.eventDate,
      totalAmount:dbModel.totalAmount,
      eventTitle:  dbModel.eventTitle,
      eventVenue: dbModel.eventVenue,
      createdAt :dbModel.createdAt,
      userName: dbModel.userName,
      organizerId:dbModel.organizerId,
      eventImages:dbModel.eventImages,
      paymentId: dbModel.paymentId,
      payoutDueDate: dbModel.payoutDueDate,
      payoutStatus: dbModel.payoutStatus,
      organizerStripId: dbModel.organizerStripId,
      payoutDate: dbModel.payoutDate,
      ticketUrls : dbModel.ticketUrls,
      sessionId: dbModel.sessionId,
      commissionRate: dbModel.commissionRate,
      platformFee : dbModel.platformFee,
      organizerAmount : dbModel.organizerAmount,
      subScriptionPlanId: dbModel.subScriptionPlanId,
      paymentIntentId: dbModel.paymentIntentId,
      refundIds: dbModel.refundIds,
      refundedAmount: dbModel.refundedAmount,
      userEmail: dbModel.userEmail,
      paymentMethod: dbModel.paymentMethod,
      refundStatus: dbModel.refundStatus,
      refundDate: dbModel.refundDate

    })
}
toDomainList(dbModel: BookingDbModel[]): BookingEntity[] {
    return dbModel.map((m) => this.toDomain(m))
}
}
