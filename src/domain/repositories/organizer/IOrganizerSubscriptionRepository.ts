import { ReportRange } from '../../../infrastructure/types/dashboard/booking';
import { OrganizerSubscriptionEntity } from '../../entities/organizer/OrganizerSubscriptionEntity';
import { SubscriptionStatus } from '../../enums/organizer/subscription';

// ---- Timeline ----
export interface SubscriptionRevenueTimelineItem {
  dateLabel: string; // "2025-01" / "2025-01-21" / "2025"
  revenue: number;
  subscriptions: number;
}

export interface SubscriptionRevenueTimeline {
  totalRevenue: number;
  totalSubscriptions: number;
  timeline: SubscriptionRevenueTimelineItem[];
}

// ---- Plan-wise analytics ----
export interface PlanSubscriptionAnalytics {
  planId: string;
  planName: string;
  subscribers: number;
  revenue: number;
  averageRevenuePerOrganizer: number;
}

// ---- Organizer-wise analytics ----
export interface OrganizerSubscriptionAnalytics {
  organizerId: string;
  organizerName: string;
  organizerEmail: string;
  totalSpent: number;
  subscriptionsCount: number;
  plansUsed: string[];
}

// ---- Status summary ----
export interface SubscriptionStatusSummary {
  active: number;
  expired: number;
  pending: number;
}
// ---- Conversion ----
export interface SubscriptionConversionSummary {
  totalOrganizers: number;
  paidOrganizers: number;
  conversionRate: number; // %
}

export interface IOrganizerSubscriptionRepository {
  createSubscription(
    entity: OrganizerSubscriptionEntity
  ): Promise<OrganizerSubscriptionEntity>;
  updateSubscription(
    subscriptionId: string,
    entity: OrganizerSubscriptionEntity
  ): Promise<OrganizerSubscriptionEntity>;
  fetchSubscriptionById(
    organizerId: string,
    status?: SubscriptionStatus
  ): Promise<OrganizerSubscriptionEntity>;
  fetchExpiredSubscription(
    currentDate: Date
  ): Promise<OrganizerSubscriptionEntity[]>;
  getRevenueByRange(range: ReportRange): Promise<SubscriptionRevenueTimeline>;
  getPlanWiseAnalytics(): Promise<PlanSubscriptionAnalytics[]>;
  getOrganizerWiseAnalytics(): Promise<OrganizerSubscriptionAnalytics[]>;
  getStatusSummary(): Promise<SubscriptionStatusSummary>;
}
