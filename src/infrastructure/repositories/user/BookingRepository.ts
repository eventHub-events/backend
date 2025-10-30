import { IBookingEntityFactory } from "../../../application/interface/factories/user/IBookingEntityFactory";
import { BookingEntity } from "../../../domain/entities/user/BookingEntity";
import { IBookingRepository } from "../../../domain/repositories/user/IBookingRepository";
import { BookingDbModel } from "../../../domain/types/UserTypes";
import { BookingModel, IBooking } from "../../db/models/user/BookingModel";
import { BaseRepository } from "../BaseRepository";

export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {
  constructor(
         private _bookingEntityFactory : IBookingEntityFactory<BookingDbModel, BookingEntity>
  ){
    super(BookingModel)
  }
 async createBooking(data: BookingEntity): Promise<BookingEntity> {
      const booking = await super.create(data) as BookingDbModel;
     return this._bookingEntityFactory.toDomain(booking)
  }
}