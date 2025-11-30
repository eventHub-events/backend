import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { ReportRange } from "../../../../infrastructure/types/dashboard/booking";
import { OrganizerDashboardDTO } from "../../../DTOs/organizer/dashboard/OrganizerDashboardDTO";
import { IOrganizerDashboardUseCase } from "../../../interface/useCases/organizer/dashboard/IOrganizerDashboardUseCase";

export class OrganizerDashboardUseCase implements IOrganizerDashboardUseCase {
  constructor(
     private _bookingRepo : IBookingRepository
  ){}

 async execute(organizerId: string, range: ReportRange): Promise<OrganizerDashboardDTO> {
         const [
      revenue,
      events,
      payouts
    ] = await Promise.all([
      this._bookingRepo.getOrganizerRevenueByRange(organizerId, range),
      this._bookingRepo.getOrganizerEventPerformance(organizerId),
      this._bookingRepo.getOrganizerPayoutSummary(organizerId)
    ]);
   
    const totalBookings = events.reduce((s, e) => s + e.bookingsCount, 0);
    const totalTicketsSold = events.reduce((s, e) => s + e.totalTicketsSold, 0);

    return {
      summary: {
        totalRevenue: revenue.totalRevenue,
        totalBookings,
        totalTicketsSold
      },
      revenue,
      events,
      payouts,
      bookings: { totalBookings, timeline: [] },
      tickets: { totalTicketsSold, timeline: [] }
    };
  }
 }
