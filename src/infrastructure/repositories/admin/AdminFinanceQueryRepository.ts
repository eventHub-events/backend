import { regex } from "zod";
import {
  FinanceOverviewFilter,
  FinanceOverviewResults,
  FinanceOverviewSubscription,
} from "../../../domain/interface/admin-finance-query/finance";
import { RefundOverviewResult, RefundPaginatedResult, RefundRow, RefundsFilter } from "../../../domain/interface/admin-finance-query/refund";
import { TransactionPaginatedResult, TransactionsFilter, TransactionsRow } from "../../../domain/interface/admin-finance-query/transactions";

import { IAdminFinanceQueryRepository } from "../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { OrganizerSubscriptionModel } from "../../db/models/organizer/subscription/OrganizerSubscriptionModel";
import { BookingModel } from "../../db/models/user/BookingModel";
import { PayoutOverviewResult, PayoutPaginatedResult, PayoutsFilter } from "../../../domain/interface/admin-finance-query/payout";

export class AdminFinanceQueryRepository implements IAdminFinanceQueryRepository {
  async getFinanceOverview(
    filter: FinanceOverviewFilter
  ): Promise<FinanceOverviewResults> {
    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

   const from = filter.from ? new Date(filter.from) : defaultFrom;

const to = filter.to ? new Date(filter.to) : now;
to.setHours(23, 59, 59, 999); 

   
    // ───────────────────────────────────────────────
    // BOOKINGS AGGREGATION (Totals + Trends)
    // ───────────────────────────────────────────────

    const bookingsAgg = await BookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: from, $lte: to },
        },
      },

      {
        $facet: {
          // -------------------- TOTALS --------------------
          totals: [
            {
              $group: {
                _id: null,

                totalBookings: { $sum: 1 },

                confirmedBookings: {
                  $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
                },

                cancelledBookings: {
                  $sum: {
                    $cond: [
                      { $in: ["$status", ["cancelled", "refunded"]] },
                      1,
                      0,
                    ],
                  },
                },

                failedPayments: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "payment-failed"] }, 1, 0],
                  },
                },

                refundedBookings: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "refunded"] }, 1, 0],
                  },
                },

                grossTicketSales: {
                  $sum: {
                    $cond: [
                      { $in: ["$status", ["confirmed", "refunded"]] },
                      "$totalAmount",
                      0,
                    ],
                  },
                },

                totalRefunds: { $sum: "$refundedAmount" },
                platformRevenueFromTickets: { $sum: "$platformFee" },
                organizerRevenueFromTickets: { $sum: "$organizerAmount" },

                pendingPayoutAmount: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ["$payoutStatus", "pending"] },
                          { $eq: ["$status", "confirmed"] },
                        ],
                      },
                      "$organizerAmount",
                      0,
                    ],
                  },
                },
              },
            },
          ],

          // -------------------- DAILY TREND --------------------
          dailyTrend: [
            {
              $group: {
                _id: {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$platformFee" },
                refunds: { $sum: "$refundedAmount" },
              },
            },
            { $sort: { "_id.date": 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id.date",
                revenue: 1,
                refunds: 1,
              },
            },
          ],

          // -------------------- MONTHLY TREND --------------------
          monthlyTrend: [
            {
              $group: {
                _id: {
                  month: {
                    $dateToString: { format: "%Y-%m", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$platformFee" },
                refunds: { $sum: "$refundedAmount" },
              },
            },
            { $sort: { "_id.month": 1 } },
            {
              $project: {
                _id: 0,
                month: "$_id.month",
                revenue: 1,
                refunds: 1,
              },
            },
          ],

          // -------------------- YEARLY TREND --------------------
          yearlyTrend: [
            {
              $group: {
                _id: {
                  year: {
                    $dateToString: { format: "%Y", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$platformFee" },
                refunds: { $sum: "$refundedAmount" },
              },
            },
            { $sort: { "_id.year": 1 } },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                revenue: 1,
                refunds: 1,
              },
            },
          ],
        },
      },
    ]);

    const bookingData = bookingsAgg[0];
    const totals = bookingData?.totals[0] ?? {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      failedPayments: 0,
      refundedBookings: 0,
      grossTicketSales: 0,
      totalRefunds: 0,
      platformRevenueFromTickets: 0,
      organizerRevenueFromTickets: 0,
      pendingPayoutAmount: 0,
    };

    // ───────────────────────────────────────────────
    // SUBSCRIPTION AGGREGATION (Totals + Trends)
    // ───────────────────────────────────────────────

    const subscriptionAgg = await OrganizerSubscriptionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: from, $lte: to },
          // status: { $in: ["active",  "upgraded"] },
        },
      },

      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                subscriptionRevenue: { $sum: "$price" },
                totalSubscription: { $sum: 1 },
              },
            },
          ],

          // DAILY
          dailyTrend: [
            {
              $group: {
                _id: {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.date": 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id.date",
                revenue: 1,
              },
            },
          ],

          // MONTHLY
          monthlyTrend: [
            {
              $group: {
                _id: {
                  month: {
                    $dateToString: { format: "%Y-%m", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.month": 1 } },
            {
              $project: {
                _id: 0,
                month: "$_id.month",
                revenue: 1,
              },
            },
          ],

          // YEARLY
          yearlyTrend: [
            {
              $group: {
                _id: {
                  year: {
                    $dateToString: { format: "%Y", date: "$createdAt" },
                  },
                },
                revenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.year": 1 } },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                revenue: 1,
              },
            },
          ],
        },
      },
    ]);

    const subscription =
      subscriptionAgg[0]?.totals[0] ??
      ({
        subscriptionRevenue: 0,
        totalSubscription: 0,
      } as FinanceOverviewSubscription);

    // ───────────────────────────────────────────────
    // FINAL RESULT
    // ───────────────────────────────────────────────

    const result: FinanceOverviewResults = {
      timeRange: { from, to },

      totals: {
        grossTicketSales: totals.grossTicketSales || 0,
        totalRefunds: totals.totalRefunds || 0,
        platformRevenueFromTickets:
          totals.platformRevenueFromTickets || 0,
        organizerRevenueFromTickets:
          totals.organizerRevenueFromTickets || 0,

        totalBookings: totals.totalBookings || 0,
        confirmedBookings: totals.confirmedBookings || 0,
        cancelledBookings: totals.cancelledBookings || 0,
        failedPayments: totals.failedPayments || 0,
        refundedBookings: totals.refundedBookings || 0,
      },

      subscription: {
        subscriptionRevenue: subscription.subscriptionRevenue || 0,
        totalSubscription: subscription.totalSubscription || 0,
      },

      payouts: {
        pendingPayoutAmount: totals.pendingPayoutAmount || 0,
        paidPayoutAmount: totals.paidPayoutAmount || 0,
      },

      trend: {
        daily: bookingData.dailyTrend,
        monthly: bookingData.monthlyTrend,
        yearly: bookingData.yearlyTrend,

        // subscription trends
        subscriptionDaily: subscriptionAgg[0].dailyTrend,
        subscriptionMonthly: subscriptionAgg[0].monthlyTrend,
        subscriptionYearly: subscriptionAgg[0].yearlyTrend,
      },
    };

    return result;
  }
  async getTransactions(filter: TransactionsFilter): Promise<TransactionPaginatedResult> {
     const{ page, limit, from, to,status,eventTitle, organizerName, userName} = filter;
        

        
     const skip = (page -1) * limit;

     const match: Record<string, unknown> = {};

      if(from && to ) match.createdAt = {$gte : from, $lte : to};
      if(status) match.status = status;
      if(eventTitle) match.eventTitle = {$regex : eventTitle, $options: "i"};
      if(organizerName) match.organizer = {$regex: organizerName, $options: "i"};
      if(userName) match.userName = {$regex: userName,$options:"i" };

      const rows = await BookingModel.aggregate<TransactionsRow>([
         {$match : match},

         {
           $project : {
             bookingId :{$toString: "$_id"},
             eventId : {$toString : "$eventId"},
             eventTitle : 1,
             organizerName: 1,
             userName: 1,
             totalAmount :1 ,
             platformFee : 1,
             organizerAmount: 1,
             paymentMethod: 1,
             paymentId: 1,
             status: 1,
             createdAt: 1
           },
         },
          {$sort : {createdAt: -1}},
          {$skip : skip},
          {$limit : limit}
      ]);

     const total = await BookingModel.countDocuments(match);
     return {
       page,
       limit,
       total,
       totalPages : Math.ceil(total / limit),
       data: rows
     }
  }

  async getRefunds(filter: RefundsFilter) : Promise<RefundPaginatedResult> {
      const {
         page = 1,
         limit =10,
         from,
         to,
         status,
         eventTitle,
         organizerName,
         paymentMethod,
         userName
      } = filter;
     
     const skip = (page -1) * limit;
    
       const match:Record<string,unknown> = {
        refundedAmount : {$gt : 0} 
       }
      
     if(from && to) {
      match.refundDate = {
         $gte: new Date(from),
         $lte : new Date(to)
      };
     }

     if(status) match.refundStatus = status;
     if(eventTitle) match.eventTitle ={$regex : eventTitle, $options : "i"};
     if(organizerName) match.organizerName = {$regex : organizerName, $options : "i"};
     if(userName) match.userName ={$regex : userName, $options : "i"};
     if(paymentMethod) match.paymentMethod = paymentMethod;

     const rows = await BookingModel.aggregate<RefundRow>([
       {$match : match},

       {
         $project : {
           bookingId :{$toString: "$_id"},
           eventId : {$toString: "$eventId"},
           eventTitle : 1,
           organizerName : 1,
           userName : 1,

           refundedAmount : 1,
           refundStatus : 1,
           refundDate : 1,
           paymentMethod : 1,
           paymentId : 1,

           refundId : {$arrayElemAt : ["$refundIds", 0]},
           createdAt :1
         }
       },

       {$sort : {refundDate : -1}},
       {$skip : skip},
       {$limit : limit}
       
     ]);
   
    const total = await BookingModel.countDocuments(match);

    return {
       page,
       limit,
       total,
       totalPages :Math.ceil(total/ limit),
       data : rows
    }

  }

  async getRefundOverview(filter?: RefundsFilter) : Promise<RefundOverviewResult> {

       const now = new Date();
       const defaultFrom = new Date(now.getTime()-30*24*3600*1000);
       const start = filter?.from? new Date(filter.from): defaultFrom;
       const end = filter?.to ? new Date(filter.to) : now;
       end.setHours(23,59,999);

       const agg = await BookingModel.aggregate([
          {
             $match : {
               refundedAmount : {$gt: 0},
               refundDate: {$gte:start,$lte: end}
             }
          },

          {
             $facet: {
              total:[
                {
                   $group: {
                    _id: null,
                    totalRefundedAmount :{$sum : "$refundedAmount"},
                    refundCount : {$sum :1},
                    refundsPending : {
                      $sum :{$cond : [{$eq: ["$refundStatus","pending"]},1,0]}

                    },
                    refundsProcessed :{
                      $sum:{$cond :[{$eq : ["$refundStatus","succeeded"]},1,0]}
                    }
                   }
                }
              ],
                     daily: [
            {
              $group: {
                _id: {
                  date: { $dateToString: { format: "%Y-%m-%d", date: "$refundDate" } }
                },
                amount: { $sum: "$refundedAmount" },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id.date": 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id.date",
                amount: 1,
                count: 1
              }
            }
          ],
              monthly: [
            {
              $group: {
                _id: {
                  month: { $dateToString: { format: "%Y-%m", date: "$refundDate" } }
                },
                amount: { $sum: "$refundedAmount" },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id.month": 1 } },
            {
              $project: {
                _id: 0,
                month: "$_id.month",
                amount: 1,
                count: 1
              }
            }
          ],
             yearly: [
            {
              $group: {
                _id: {
                  year: { $dateToString: { format: "%Y", date: "$refundDate" } }
                },
                amount: { $sum: "$refundedAmount" },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id.year": 1 } },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                amount: 1,
                count: 1
              }
            }
          ]
             }
          }
       ])
     const result = agg[0] || {};

const totals = result.total?.[0] ?? {
  totalRefundAmount: 0,
  refundedCount: 0,
  refundsPending: 0,
  refundProcessed: 0,
};

return {
   timeRange: { from: start, to: end },

  totals,

  trend: {
    daily: result.daily ?? [],
    monthly: result.monthly ?? [],
    yearly: result.yearly ?? []
  }
} as RefundOverviewResult;


  }

  async getPayoutOverview(filter: FinanceOverviewFilter): Promise<PayoutOverviewResult> {
  const now = new Date();
  const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const from = filter.from ? new Date(filter.from) : defaultFrom;
  const to = filter.to ? new Date(filter.to) : now;
  to.setHours(23, 59, 59, 999);

  const agg = await BookingModel.aggregate([
    {
      $match: {
        organizerAmount: { $gt: 0 },
        createdAt: { $gte: from, $lte: to }
      }
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalPendingPayout: {
                $sum: {
                  $cond: [{ $eq: ["$payoutStatus", "pending"] }, "$organizerAmount", 0]
                }
              },
              totalPaidPayout: {
                $sum: {
                  $cond: [{ $eq: ["$payoutStatus", "paid"] }, "$organizerAmount", 0]
                }
              },
              pendingCount: {
                $sum: { $cond: [{ $eq: ["$payoutStatus", "pending"] }, 1, 0] }
              },
              paidCount: {
                $sum: { $cond: [{ $eq: ["$payoutStatus", "paid"] }, 1, 0] }
              }
            }
          }
        ],

        daily: [
          {
            $group: {
              _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$payoutDate" } }
              },
              amount: {
                $sum: {
                  $cond: [{ $eq: ["$payoutStatus", "paid"] }, "$organizerAmount", 0]
                }
              }
            }
          },
          { $sort: { "_id.date": 1 } },
          { $project: { _id: 0, date: "$_id.date", amount: 1 } }
        ],

        monthly: [
          {
            $group: {
              _id: {
                month: { $dateToString: { format: "%Y-%m", date: "$payoutDate" } }
              },
              amount: {
                $sum: {
                  $cond: [{ $eq: ["$payoutStatus", "paid"] }, "$organizerAmount", 0]
                }
              }
            }
          },
          { $sort: { "_id.month": 1 } },
          { $project: { _id: 0, month: "$_id.month", amount: 1 } }
        ],

        yearly: [
          {
            $group: {
              _id: {
                year: { $dateToString: { format: "%Y", date: "$payoutDate" } }
              },
              amount: {
                $sum: {
                  $cond: [{ $eq: ["$payoutStatus", "paid"] }, "$organizerAmount", 0]
                }
              }
            }
          },
          { $sort: { "_id.year": 1 } },
          { $project: { _id: 0, year: "$_id.year", amount: 1 } }
        ]
      }
    }
  ]);

  const result = agg[0];
  return {
    timeRange: { from, to },
    totals: result.totals[0] ?? {
      totalPendingPayout: 0,
      totalPaidPayout: 0,
      pendingCount: 0,
      paidCount: 0
    },
    trend: {
      daily: result.daily,
      monthly: result.monthly,
      yearly: result.yearly
    }
  };
}
async getPayouts(filter: PayoutsFilter): Promise<PayoutPaginatedResult> {
  const { page = 1, limit = 10, from, to, status, organizerName, eventTitle } = filter;

  const skip = (page - 1) * limit;

  const match: any = {
    organizerAmount: { $gt: 0 }
  };

  if (from && to) match.createdAt = { $gte: new Date(from), $lte: new Date(to) };
  if (status) match.payoutStatus = status;
  if (organizerName) match.organizerName = { $regex: organizerName, $options: "i" };
  if (eventTitle) match.eventTitle = { $regex: eventTitle, $options: "i" };

  const rows = await BookingModel.aggregate([
    { $match: match },
    {
      $project: {
        bookingId: { $toString: "$_id" },
        eventId: { $toString: "$eventId" },
        eventTitle: 1,
        organizerName: 1,
        organizerAmount: 1,
        payoutStatus: 1,
        payoutDueDate: 1,
        payoutDate: 1,
        paymentMethod: 1,
        paymentId: 1,
        createdAt: 1
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ]);

  const total = await BookingModel.countDocuments(match);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: rows
  };
}

}
