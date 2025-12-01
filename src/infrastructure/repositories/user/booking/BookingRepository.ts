import { FilterQuery, PipelineStage, Types } from "mongoose";
import { IBookingEntityFactory } from "../../../../application/interface/factories/user/IBookingEntityFactory";
import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { BookingDbModel } from "../../../../domain/types/UserTypes";
import { BookingModel, IBooking } from "../../../db/models/user/BookingModel";
import { BaseRepository } from "../../BaseRepository";
import { BookingFilterDTO } from "../../../../application/DTOs/organizer/bookings/bookingFilterDTO";
import { BookingMatchFilter, ReportRange } from "../../../types/dashboard/booking";
import { BookingStatus, PayoutStatus } from "../../../../domain/enums/user/Booking";
import { RevenueAndBookingSummary } from "../../../../domain/entities/user/RevenueAndBookingSummary";
import { PayoutSummary } from "../../../../domain/entities/user/PayoutSummary";
import { OrganizerEventPerformance, OrganizerEventPerformanceResult, OrganizerPayoutSummary, OrganizerRevenueTimeline } from "../../../../application/DTOs/organizer/dashboard/OrganizerDashboardDTO";


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

 async findBookingsByEventIdAndUserId(eventId:string, userId: string) : Promise<BookingEntity | null> {
     const doc = await super.findOne({eventId, userId}) as BookingDbModel;
  return doc ? this._bookingEntityFactory.toDomain(doc): null;
 }
 async findBookingsByOrganizerIdAndUserId(organizerId:string, userId: string) : Promise<BookingEntity | null> {
     const doc = await super.findOne({organizerId, userId}) as BookingDbModel;
  return doc ? this._bookingEntityFactory.toDomain(doc): null;
 }

  async  getRevenueAndBookingSByRange(range: ReportRange): Promise<RevenueAndBookingSummary> {

        const now = new Date();
       const fromDate = new Date();
       let dateFormat: "%Y-%m-%d" | "%Y-%m" | "%Y";


        switch (range) {
      case "daily":
        fromDate.setDate(now.getDate() - 6);
        dateFormat = "%Y-%m-%d";
        break;

      case "monthly":
        fromDate.setMonth(now.getMonth() - 5);
        dateFormat = "%Y-%m";
        break;

      case "yearly":
        fromDate.setFullYear(now.getFullYear() - 4);
        dateFormat = "%Y";
        break;
    }

       const match: BookingMatchFilter = {
      status: BookingStatus.CONFIRMED,
      createdAt: {
        $gte: fromDate,
        $lte: now,
      },
    };

         // ✅ Timeline aggregation
    const timelineRaw = await BookingModel.aggregate<{
      _id: string;
      totalRevenue: number;
      platformRevenue: number;
      organizerRevenue: number;
      bookingsCount: number;
    }>([
      { $match: match },
      {
        $group: {
          _id: {
            $dateToString: {
              format: dateFormat,
              date: "$createdAt",
            },
          },
          totalRevenue: { $sum: "$totalAmount" },
          platformRevenue: { $sum: "$platformFee" },
          organizerRevenue: { $sum: "$organizerAmount" },
          bookingsCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

             const timeline = timelineRaw.map(row => ({
      dateLabel: row._id,
      totalRevenue: row.totalRevenue ?? 0,
      platformRevenue: row.platformRevenue ?? 0,
      organizerRevenue: row.organizerRevenue ?? 0,
      bookingsCount: row.bookingsCount ?? 0,
    })); 
       // ✅ Totals aggregation
    const totalsRaw = await BookingModel.aggregate<{
      totalRevenue: number;
      platformRevenue: number;
      organizerRevenue: number;
      bookingsCount: number;
    }>([
      { $match: match },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          platformRevenue: { $sum: "$platformFee" },
          organizerRevenue: { $sum: "$organizerAmount" },
          bookingsCount: { $sum: 1 },
        },
      },
    ]);

         const totals = totalsRaw[0] ?? {
      totalRevenue: 0,
      platformRevenue: 0,
      organizerRevenue: 0,
      bookingsCount: 0,
    };

     return {
         totals,
         timeline
     };
  }

async getPendingPayoutSummary(): Promise<PayoutSummary> {
      
       const match: BookingMatchFilter = {
      status: BookingStatus.CONFIRMED,
      payoutStatus: PayoutStatus.PENDING,
    };

     const result = await BookingModel.aggregate<{
      pendingAmount: number;
      pendingCount: number;
    }>([
      { $match: match },
      {
        $group: {
          _id: null,
          pendingAmount: { $sum: "$organizerAmount" },
          pendingCount: { $sum: 1 },
        },
      },
    ]);

    const doc = result[0] ?? { pendingAmount: 0, pendingCount: 0 };

    return {
      pendingAmount: doc.pendingAmount,
      pendingCount: doc.pendingCount,
    };
}
 async getOrganizerRevenueByRange(organizerId: string, range: ReportRange): Promise<OrganizerRevenueTimeline> {
         const now = new Date();
  const from = new Date();

  let format: "%Y-%m-%d" | "%Y-%m" | "%Y";

  if (range === "daily") {
    from.setDate(now.getDate() - 6);
    format = "%Y-%m-%d";
  } else if (range === "monthly") {
    from.setMonth(now.getMonth() - 5);
    format = "%Y-%m";
  } else {
    from.setFullYear(now.getFullYear() - 4);
    format = "%Y";
  }

  const rows = await BookingModel.aggregate<{
    _id: string;
    revenue: number;
  }>([
    {
      $match: {
        organizerId: new Types.ObjectId(organizerId),
        status: BookingStatus.CONFIRMED,
        createdAt: { $gte: from, $lte: now }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format, date: "$createdAt" }
        },
        revenue: { $sum: "$organizerAmount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return {
    totalRevenue: rows.reduce((s, r) => s + r.revenue, 0),
    timeline: rows.map(r => ({
      dateLabel: r._id,
      revenue: r.revenue
    }))
  };
}
async getOrganizerEventPerformance(organizerId: string): Promise<OrganizerEventPerformance[]> {
     return BookingModel.aggregate<OrganizerEventPerformance>([
    {
      $match: {
        organizerId: new Types.ObjectId(organizerId),
        status: BookingStatus.CONFIRMED
      }
    },
    { $unwind: "$tickets" },
    {
      $group: {
        _id: "$eventId",
        eventTitle: { $first: "$eventTitle" },
        eventDate: { $first: "$eventDate" },
        totalTicketsSold: { $sum: "$tickets.quantity" },
        bookingsCount: { $sum: 1 },
        revenue: { $sum: "$organizerAmount" }
      }
    },
    {
      $project: {
        _id: 0,
        eventId: { $toString: "$_id" },
        eventTitle: 1,
        eventDate: 1,
        totalTicketsSold: 1,
        bookingsCount: 1,
        revenue: 1
      }
    },
    { $sort: { revenue: -1 } }
  ]);
}
 async getOrganizerPayoutSummary(organizerId: string): Promise<OrganizerPayoutSummary> {
      const [doc] = await BookingModel.aggregate<{
    pendingAmount: number;
    pendingCount: number;
    lastPayoutDate?: Date;
  }>([
    {
      $match: {
        organizerId: new Types.ObjectId(organizerId),
        status: BookingStatus.CONFIRMED
      }
    },
    {
      $group: {
        _id: null,
        pendingAmount: {
          $sum: {
            $cond: [
              { $eq: ["$payoutStatus", PayoutStatus.PENDING] },
              "$organizerAmount",
              0
            ]
          }
        },
        pendingCount: {
          $sum: {
            $cond: [
              { $eq: ["$payoutStatus", PayoutStatus.PENDING] },
              1,
              0
            ]
          }
        },
        lastPayoutDate: { $max: "$payoutDate" }
      }
    }
  ]);

  return doc ?? { pendingAmount: 0, pendingCount: 0 };
 }  
  async getOrganizerEventPerformanceForTable(organizerId: string,page: number,limit: number): Promise<OrganizerEventPerformanceResult> {
       const skip = (page - 1) * limit;

  const pipeline :PipelineStage[] = [
    {
      $match: {
        organizerId: new Types.ObjectId(organizerId),
        status: BookingStatus.CONFIRMED
      }
    },
    {
      $unwind: "$tickets"
    },
    {
      $group: {
        _id: "$eventId",
        eventTitle: { $first: "$eventTitle" },
        eventDate: { $first: "$eventDate" },
        bookingsCount: { $addToSet: "$_id" },
        totalTicketsSold: { $sum: "$tickets.quantity" },
        revenue: { $sum: "$tickets.price" }
      }
    },
    {
      $project: {
        _id: 0,
        eventId: { $toString: "$_id" },
        eventTitle: 1,
        eventDate: 1,
        bookingsCount: { $size: "$bookingsCount" },
        totalTicketsSold: 1,
        revenue: 1
      }
    },
    { $sort: { eventDate: -1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "count" }]
      }
    }
  ];

  const result = await BookingModel.aggregate<{
    data: OrganizerEventPerformance[];
    total: { count: number }[];
  }>(pipeline);

  const events = result[0]?.data ?? [];
  const totalCount = result[0]?.total[0]?.count ?? 0;

  return {
    events,
    totalPages: Math.ceil(totalCount / limit)
  };
 }     
}