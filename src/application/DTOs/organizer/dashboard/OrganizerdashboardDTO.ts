export interface OrganizerDashboardDTO {
  summary: OrganizerSummaryMetrics;
  revenue: OrganizerRevenueTimeline;
  bookings: OrganizerBookingTimeline;
  tickets: OrganizerTicketTimeline;
  events: OrganizerEventPerformance[];
  payouts: OrganizerPayoutSummary;
}
export interface OrganizerSummaryMetrics {
  totalRevenue: number;
  totalBookings: number;
  totalTicketsSold: number;
}
export interface OrganizerRevenueTimelineItem {
  dateLabel: string;
  revenue: number;
}

export interface OrganizerRevenueTimeline {
  totalRevenue: number;
  timeline: OrganizerRevenueTimelineItem[];
}
export interface OrganizerBookingTimelineItem {
  dateLabel: string;
  bookingsCount: number;
}

export interface OrganizerBookingTimeline {
  totalBookings: number;
  timeline: OrganizerBookingTimelineItem[];
}
export interface OrganizerTicketTimelineItem {
  dateLabel: string;
  ticketsSold: number;
}

export interface OrganizerTicketTimeline {
  totalTicketsSold: number;
  timeline: OrganizerTicketTimelineItem[];
}
export interface OrganizerEventPerformance {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  totalTicketsSold: number;
  bookingsCount: number;
  revenue: number;
}
export interface OrganizerEventPerformanceResult {
  events: OrganizerEventPerformance[];
  totalPages: number;
}
export interface OrganizerPayoutSummary {
  pendingAmount: number;
  pendingCount: number;
  lastPayoutDate?: Date;
}
// domain/dto/organizer/OrganizerEventPerformance.ts

export interface OrganizerEventPerformance {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  totalTicketsSold: number;
  bookingsCount: number;
  revenue: number;
}
