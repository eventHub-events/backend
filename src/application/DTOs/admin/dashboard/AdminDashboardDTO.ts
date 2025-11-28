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
  timeline: BookingTimelineItem[];
}

// ---- Subscription ----
export interface SubscriptionMetricsDTO {
  totalRevenue: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
   timeline: SubscriptionTimelineItem[];
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
// Generic timeline item
export interface TimelineItem {
  dateLabel: string; // "2025-01", "2025-01-21", "2025"
  value: number;
}

// Booking revenue timeline
export interface BookingTimelineItem {
  dateLabel: string;
  totalRevenue: number;
  platformRevenue: number;
  organizerRevenue: number;
  bookingsCount: number;
}

// Subscription timeline
export interface SubscriptionTimelineItem {
  dateLabel: string;
  revenue: number;
  subscriptions: number;
}
