import { IOrganizerSubscriptionEntityFactory } from "../../../application/interface/factories/organizer/IOrganizerSubscriptionEntityFactory";
import { OrganizerSubscriptionEntity } from "../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { SubscriptionStatus } from "../../../domain/enums/organizer/subscription";
import { IOrganizerSubscriptionRepository, OrganizerSubscriptionAnalytics, PlanSubscriptionAnalytics, SubscriptionConversionSummary, SubscriptionRevenueTimeline, SubscriptionRevenueTimelineItem, SubscriptionStatusSummary } from "../../../domain/repositories/organizer/IOrganizerSubscriptionRepository";
import { OrganizerSubscriptionDbModel } from "../../../domain/types/OrganizerTypes";
import { IOrganizerSubscription, OrganizerSubscriptionModel } from "../../db/models/organizer/subscription/OrganizerSubscriptionModel";
import { ReportRange } from "../../types/dashboard/booking";
import { BaseRepository } from "../BaseRepository";

export class OrganizerSubscriptionRepository extends BaseRepository<IOrganizerSubscription> implements IOrganizerSubscriptionRepository {

   constructor(
         private _SubscriptionEntityFactory : IOrganizerSubscriptionEntityFactory
   ){
     super(OrganizerSubscriptionModel)
   }
 async createSubscription(entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {

      const created =  await super.create(entity) as OrganizerSubscriptionDbModel;
  return this._SubscriptionEntityFactory.toDomain(created);

  }
 async  updateSubscription(subscriptionId: string, entity: OrganizerSubscriptionEntity): Promise<OrganizerSubscriptionEntity> {

       const updated = await super.update(subscriptionId, entity) as OrganizerSubscriptionDbModel;
    return this._SubscriptionEntityFactory.toDomain(updated);
  }
  
  async fetchSubscriptionById(organizerId: string, status?: SubscriptionStatus ): Promise<OrganizerSubscriptionEntity> {
             status = status?status:SubscriptionStatus.Active;
             
      const fetched = await super.findOne({organizerId, status}) as OrganizerSubscriptionDbModel;
  return this._SubscriptionEntityFactory.toDomain(fetched);

  }
 async fetchExpiredSubscription(currentDate: Date): Promise< OrganizerSubscriptionEntity[] > {
           const filter = {
                status: SubscriptionStatus.Active,
                endDate: currentDate
            }

        const subscriptions = await super.findAll(filter) as OrganizerSubscriptionDbModel[];

    return this._SubscriptionEntityFactory.toDomainList(subscriptions);

  }

 async getRevenueByRange(range: ReportRange): Promise<SubscriptionRevenueTimeline> {
      const now = new Date();
  let fromDate = new Date();
  let format = "%Y-%m-%d";

  if (range === "monthly") {
    fromDate.setMonth(now.getMonth() - 5);
    format = "%Y-%m";
  }

  if (range === "yearly") {
    fromDate.setFullYear(now.getFullYear() - 4);
    format = "%Y";
  }

  const rows = await OrganizerSubscriptionModel.aggregate<{
    _id: string;
    revenue: number;
    subscriptions: number;
  }>([
    {
      $match: {
        status: SubscriptionStatus.Active,
        createdAt: { $gte: fromDate, $lte: now }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format,
            date: "$createdAt"
          }
        },
        revenue: { $sum: "$price" },
        subscriptions: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const timeline: SubscriptionRevenueTimelineItem[] = rows.map(r => ({
    dateLabel: r._id,
    revenue: r.revenue,
    subscriptions: r.subscriptions
  }));

  return {
    totalRevenue: timeline.reduce((s, t) => s + t.revenue, 0),
    totalSubscriptions: timeline.reduce((s, t) => s + t.subscriptions, 0),
    timeline
  };
 }
 async getPlanWiseAnalytics(): Promise<PlanSubscriptionAnalytics[]> {
       return OrganizerSubscriptionModel.aggregate<PlanSubscriptionAnalytics>([
    {
      $match: { status: SubscriptionStatus.Active }
    },
    {
      $group: {
        _id: "$planId",
        planName: { $first: "$planName" },
        subscribers: { $sum: 1 },
        revenue: { $sum: "$price" }
      }
    },
    {
      $project: {
        _id: 0,
        planId: { $toString: "$_id" },
        planName: 1,
        subscribers: 1,
        revenue: 1,
        averageRevenuePerOrganizer: {
          $cond: [
            { $eq: ["$subscribers", 0] },
            0,
            { $divide: ["$revenue", "$subscribers"] }
          ]
        }
      }
    },
    { $sort: { revenue: -1 } }
  ]);
 }

 async getOrganizerWiseAnalytics(): Promise<OrganizerSubscriptionAnalytics[]> {
      return OrganizerSubscriptionModel.aggregate([
    {
      $match: { status: SubscriptionStatus.Active }
    },
    {
      $group: {
        _id: "$organizerId",
        organizerName: { $first: "$organizerName" },
        organizerEmail: { $first: "$organizerEmail" },
        totalSpent: { $sum: "$price" },
        subscriptionsCount: { $sum: 1 },
        plansUsed: { $addToSet: "$planName" }
      }
    },
    {
      $project: {
        _id: 0,
        organizerId: { $toString: "$_id" },
        organizerName: 1,
        organizerEmail: 1,
        totalSpent: 1,
        subscriptionsCount: 1,
        plansUsed: 1
      }
    },
    { $sort: { totalSpent: -1 } }
  ]);
 }

 async getStatusSummary(): Promise<SubscriptionStatusSummary> {
      const rows = await OrganizerSubscriptionModel.aggregate<{
    _id: SubscriptionStatus;
    count: number;
  }>([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  return {
    active: rows.find(r => r._id === SubscriptionStatus.Active)?.count ?? 0,
    expired: rows.find(r => r._id === SubscriptionStatus.Expired)?.count ?? 0,
    pending: rows.find(r => r._id === SubscriptionStatus.Pending)?.count ?? 0
  };
 }
 
}