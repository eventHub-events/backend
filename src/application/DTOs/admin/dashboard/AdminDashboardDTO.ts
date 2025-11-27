// ---- Users & Organizers ----
export interface UserMetricsDTO {
  totalUsers: number;
  activeUsers: number;
  totalOrganizers: number;
  activeOrganizers: number;
  pendingOrganizerVerification: number;
}

// ---- Booking & Revenue ----
export interface BookingRevenueDTO {
  totalRevenue: number;
  platformRevenue: number;
  organizerRevenue: number;
  bookingsCount: number;
}

// ---- Subscription ----
export interface SubscriptionMetricsDTO {
  totalRevenue: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
}

// ---- Payout ----
export interface PayoutMetricsDTO {
  pendingAmount: number;
  pendingCount: number;
}

// ---- Dashboard ----
export interface AdminDashboardDTO {
  users: UserMetricsDTO;
  bookings: BookingRevenueDTO;
  subscriptions: SubscriptionMetricsDTO;
  payouts: PayoutMetricsDTO;
}
