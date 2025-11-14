import { FilterQuery } from "mongoose";
import { IBookingEntityFactory } from "../../../../application/interface/factories/user/IBookingEntityFactory";
import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { BookingDbModel } from "../../../../domain/types/UserTypes";
import { BookingModel, IBooking } from "../../../db/models/user/BookingModel";
import { BaseRepository } from "../../BaseRepository";
import { BookingFilterDTO } from "../../../../application/DTOs/organizer/bookings/bookingFilterDTO";


export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {
  constructor(
         private _bookingEntityFactory : IBookingEntityFactory<BookingDbModel, BookingEntity>,
        
  ){
    super(BookingModel)
  }
 async createBooking(data: BookingEntity): Promise<BookingEntity> {
      const booking = await super.create(data) as BookingDbModel;

    return this._bookingEntityFactory.toDomain(booking)
  }

  async findAllWithFilter(filter: BookingFilterDTO ): Promise<{bookings:BookingEntity[], totalPages:number}> {
       
      const cleanFilter: FilterQuery<BookingEntity> = {
          
      }
          if(filter.organizerId ) cleanFilter.organizerId= filter.organizerId
          if(filter.userId) cleanFilter.userId= filter.userId
          if (filter.status) cleanFilter.status = filter.status;
          if (filter.title)
              cleanFilter.eventTitle = { $regex: filter.title, $options: "i" };
         if(filter.organizerName) cleanFilter.organizerName = { $regex: filter.organizerName, $options: "i" };
         if (filter.userName)
           cleanFilter.userName = { $regex: filter.userName, $options: "i" };
         if (filter.startDate) {
  
             const formattedDate = new Date(filter.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                }); // => "31 Oct 2025"

            cleanFilter.eventDate = { $regex: formattedDate, $options: "i" };
           }
         if (filter.startDate && filter.endDate) {
            cleanFilter.createdAt = {
             $gte: new Date(filter.startDate),
               $lte: new Date(filter.endDate),
           };
      
         }
       const page = filter.page ?? 1;
       const limit = filter.limit ?? 10;
   
      const {data , total} = await super.paginate(cleanFilter,page,limit)
      const totalPages = Math.ceil(total/limit);
     

           const bookings =  this._bookingEntityFactory.toDomainList(data as BookingDbModel[]);

    return {bookings, totalPages}
    }

  async findBookingById(bookingId :string): Promise<BookingEntity> {
       
           const booking = await super.findById(bookingId) as BookingDbModel;

           if(!booking) throw new Error("Booking details not found");

      return this._bookingEntityFactory.toDomain(booking);
     
  }
  async  updateBooking(bookingId:string, entity: BookingEntity) :Promise<BookingEntity> {
         const updated= await super.update(bookingId, entity) as BookingDbModel;
          if(!updated) throw new Error("Booking details not updated");
      return this._bookingEntityFactory.toDomain(updated);
  }
 async findBookingsDueForPayout(currentDate: Date): Promise<BookingEntity[]> {
         const filter = {
           payoutDueDate: { $lte: currentDate },
           payoutStatus: "pending",
          };
         const bookings = await super.findAll(filter) as BookingDbModel[];
      return this._bookingEntityFactory.toDomainList(bookings);
 }
 async updateManyBookings(filter: FilterQuery<IBooking>,updateData: Partial<IBooking>): Promise<{matchedCount: number;modifiedCount: number}>{
      const result = await super.updateMany(filter, updateData);
    return result;
 }
 async fetchBookingBySessionId(sessionId: string) : Promise<BookingEntity> {

     const booking = await super.findOne({sessionId}) as BookingDbModel;
    return this._bookingEntityFactory.toDomain(booking);
 }
}