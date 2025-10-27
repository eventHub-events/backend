import { BookingEntity } from "../../entities/user/BookingEntity";

export interface IBookingRepository {
  createBooking(data: BookingEntity) : Promise<BookingEntity>;
}