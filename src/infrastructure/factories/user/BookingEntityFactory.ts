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
      createdAt :dbModel.createdAt

    })
}
toDomainList(dbModel: BookingDbModel[]): BookingEntity[] {
    return dbModel.map((m) => this.toDomain(m))
}
}
