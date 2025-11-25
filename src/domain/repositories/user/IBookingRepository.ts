import { FilterQuery } from "mongoose";
import { BookingEntity } from "../../entities/user/BookingEntity";

export interface IBookingRepository {
  createBooking(data: BookingEntity) : Promise<BookingEntity>;
  findAllWithFilter(filter: FilterQuery<BookingEntity>): Promise<{bookings:BookingEntity[], totalPages:number}>;

  findBookingById(bookingId :string): Promise<BookingEntity>;
  updateBooking(bookingId:string, entity: BookingEntity) :Promise<BookingEntity>;
  findBookingsDueForPayout(currentDate: Date): Promise<BookingEntity[]>;
  updateManyBookings(filter: FilterQuery<BookingEntity>,updateData: Partial<BookingEntity>): Promise<{matchedCount: number;modifiedCount: number}>;
  fetchBookingBySessionId(sessionId: string) : Promise<BookingEntity>;
  findBookingsByEventIdAndUserId(eventId:string, userId: string) : Promise<BookingEntity | null>;
  findBookingsByOrganizerIdAndUserId(organizerId:string, userId: string) : Promise<BookingEntity | null>;
}