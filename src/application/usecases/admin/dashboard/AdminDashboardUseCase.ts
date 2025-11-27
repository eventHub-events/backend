
import { IOrganizerSubscriptionRepository } from "../../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";
import { IUserRepository } from "../../../../domain/repositories/user/IUserRepository";
import { AdminDashboardDTO } from "../../../DTOs/admin/dashboard/AdminDashboardDTO";
import { IAdminDashboardUseCase } from "../../../interface/useCases/admin/dashboard/IAdminDashboardUseCase";

export class AdminDashboardUseCase implements IAdminDashboardUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly bookingRepo: IBookingRepository,
    private readonly subscriptionRepo: IOrganizerSubscriptionRepository
  ) {}

  async execute(): Promise<AdminDashboardDTO> {
    const [
      userSummary,
      pendingOrganizerVerification,
      bookingRevenue,
      subscriptionRevenue,
      subscriptionStatus,
      payoutSummary,

    ] = await Promise.all([
      this.userRepo.getUserCountSummary(),
      this.userRepo.getPendingOrganizerVerification(),
      this.bookingRepo.getRevenueAndBookingSByRange("monthly"),
      this.subscriptionRepo.getRevenueByRange("monthly"),
      this.subscriptionRepo.getStatusSummary(),
      this.bookingRepo.getPendingPayoutSummary()
    ]);

    return {
      users: {
        totalUsers: userSummary.totalUsers,
        activeUsers: userSummary.activeUsers,
        totalOrganizers: userSummary.totalOrganizers,
        activeOrganizers: userSummary.activeOrganizers,
        pendingOrganizerVerification
      },

      bookings: {
        totalRevenue: bookingRevenue.totals.totalRevenue,
        platformRevenue: bookingRevenue.totals.platformRevenue,
        organizerRevenue: bookingRevenue.totals.organizerRevenue,
        bookingsCount: bookingRevenue.totals.bookingsCount
      },

      subscriptions: {
        totalRevenue: subscriptionRevenue.totalRevenue,
        totalSubscriptions: subscriptionRevenue.totalSubscriptions,
        activeSubscriptions: subscriptionStatus.active
      },

      payouts: {
        pendingAmount: payoutSummary.pendingAmount,
        pendingCount: payoutSummary.pendingCount
      }
    };
  }
}
