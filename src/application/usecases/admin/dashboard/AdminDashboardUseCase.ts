import { IOrganizerSubscriptionRepository } from '../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository';
import { IBookingRepository } from '../../../../domain/repositories/user/IBookingRepository';
import { IUserRepository } from '../../../../domain/repositories/user/IUserRepository';
import { ReportRange } from '../../../../infrastructure/types/dashboard/booking';
import { AdminDashboardDTO } from '../../../DTOs/admin/dashboard/AdminDashboardDTO';
import { IAdminDashboardUseCase } from '../../../interface/useCases/admin/dashboard/IAdminDashboardUseCase';

export class AdminDashboardUseCase implements IAdminDashboardUseCase {
  constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _bookingRepo: IBookingRepository,
    private readonly _subscriptionRepo: IOrganizerSubscriptionRepository
  ) {}

  async execute(range: ReportRange): Promise<AdminDashboardDTO> {
    const [
      userSummary,
      pendingOrganizerVerification,
      bookingRevenue,
      subscriptionRevenue,
      subscriptionStatus,
      payoutSummary,
    ] = await Promise.all([
      this._userRepo.getUserCountSummary(),
      this._userRepo.getPendingOrganizerVerification(),
      this._bookingRepo.getRevenueAndBookingSByRange(range),
      this._subscriptionRepo.getRevenueByRange(range),
      this._subscriptionRepo.getStatusSummary(),
      this._bookingRepo.getPendingPayoutSummary(),
    ]);

    return {
      users: {
        totalUsers: userSummary.totalUsers,
        activeUsers: userSummary.activeUsers,
        totalOrganizers: userSummary.totalOrganizers,
        activeOrganizers: userSummary.activeOrganizers,
        pendingOrganizerVerification,
      },

      bookings: {
        totalRevenue: bookingRevenue.totals.totalRevenue,
        platformRevenue: bookingRevenue.totals.platformRevenue,
        organizerRevenue: bookingRevenue.totals.organizerRevenue,
        bookingsCount: bookingRevenue.totals.bookingsCount,
        timeline: bookingRevenue.timeline,
      },

      subscriptions: {
        totalRevenue: subscriptionRevenue.totalRevenue,
        totalSubscriptions: subscriptionRevenue.totalSubscriptions,
        activeSubscriptions: subscriptionStatus.active,
        timeline: subscriptionRevenue.timeline,
      },

      payouts: {
        pendingAmount: payoutSummary.pendingAmount,
        pendingCount: payoutSummary.pendingCount,
      },
    };
  }
}
