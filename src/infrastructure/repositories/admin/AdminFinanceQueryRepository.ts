import { FinanceOverviewFilter, FinanceOverviewResults, FinanceOverviewSubscription, FinanceOverviewTotals } from "../../../domain/interface/admin-finance-query/finance";
import { IAdminFinanceQueryRepository } from "../../../domain/repositories/admin/IAdminFinanceQueryRepository";
import { OrganizerSubscriptionModel } from "../../db/models/organizer/subscription/OrganizerSubscriptionModel";
import { BookingModel } from "../../db/models/user/BookingModel";

export class AdminFinanceQueryRepository implements IAdminFinanceQueryRepository {
  async getFinanceOverview(filter: FinanceOverviewFilter): Promise<FinanceOverviewResults> {
      const now = new Date();
      const defaultFrom = new Date(now.getTime() - 30*24*60*60*1000);

         const from = filter.from ?? defaultFrom;
          const to = filter.to ?? now;

         // -----AGGREGATION -------

        const bookingsAgg = await BookingModel.aggregate([
           {
             $match :{
               createdAt:{$gte: from, $lte : to}
             },

           },
           {
             $group: {
               _id: null,
               totalBookings:{$sum:1},
               confirmedBookings :{
                $sum: {
                   $cond:[
                    {$eq: ["$status","confirmed"]}, 1,0
                   ]
                }
               },
               cancelledBookings: {
                $sum: {
                  $cond :[{$eq: ["$status","cancelled","refunded"]},1,0]
                }
               },
               failedPayments : {
                 $sum: {
                  $cond: [{$eq: ["$status","payment-failed"]},1,10]
                 }
               },
               refundedBookings : {
                $sum : {
                  $cond: [{$eq: ["$status","refunded"]},1,0]
                }
               },
              // TICKET REVENUE RELATED //

              grossTicketSales :{
                 $sum : {
                   $cond: [{$in:["$status",["confirmed","refunded"]]},
                   "$totalAmount",
                   0
                   ]
                 }
              },
               totalRefunds : {
                $sum : "$refundedAmount"
               },
               platformRevenueFromTickets : {
                 $sum: "$platformFee"
               },
               organizerRevenueFromTickets :{
                $sum: "$organizerAmount"
               },
               pendingPayoutAmount :{
                $sum: {
                   $cond: [
                     {
                       $and:[
                        {$eq: ["$payoutStatus", "pending"]},
                        {$eq: ["$status","confirmed"]},
                       ]
                     },
                     "$organizerAmount",
                     0,
                   ]
                }
               }
             }
           }
        ]);

        const bookings = bookingsAgg[0] ?? {
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
             paidPayoutAmount: 0,
        };

        // SUBSCRIPTION AGGREGATION //

        const subscriptionAgg =  await OrganizerSubscriptionModel.aggregate([
            {
               $match: {
                 createdAt: {$gte: from, $lte: to},
                 status: {$in:["active","expired","upgraded"]}
               }
            },
            {
              $group: {
                 _id: null,
                 subscriptionRevenue: {$sum: "$price"},
                 totalSubscription :{$sum: 1},
              }
            }
        ]);

         const subscription: FinanceOverviewSubscription = subscriptionAgg[0] ?? {
        subscriptionRevenue: 0,
         totalSubscription: 0,
       };
    
        // RESULT //

     const result: FinanceOverviewResults = {
             timeRange: { from, to },
      totals: {
        grossTicketSales: bookings.grossTicketSales || 0,
        totalRefunds: bookings.totalRefunds || 0,
        platformRevenueFromTickets: bookings.platformRevenueFromTickets || 0,
        organizerRevenueFromTickets: bookings.organizerRevenueFromTickets || 0,
        totalBookings: bookings.totalBookings || 0,
        confirmedBookings: bookings.confirmedBookings || 0,
        cancelledBookings: bookings.cancelledBookings || 0,
        failedPayments: bookings.failedPayments || 0,
        refundedBookings: bookings.refundedBookings || 0,
      },
      subscription: {
        subscriptionRevenue: subscription.subscriptionRevenue || 0,
        totalSubscription: subscription.totalSubscription || 0,
      },
      payouts: {
        pendingPayoutAmount: bookings.pendingPayoutAmount || 0,
        paidPayoutAmount: bookings.paidPayoutAmount || 0,
      },
    };

    return result;
  }
     
  
}