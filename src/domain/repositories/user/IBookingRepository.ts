import { FilterQuery } from "mongoose";
import { BookingEntity } from "../../entities/user/BookingEntity";

export interface IBookingRepository {
  createBooking(data: BookingEntity) : Promise<BookingEntity>;
  findAllWithFilter(filter: FilterQuery<BookingEntity>): Promise<{bookings:BookingEntity[], totalPages:number}>;
}