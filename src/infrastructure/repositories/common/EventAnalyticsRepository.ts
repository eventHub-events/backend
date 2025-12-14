import { EventAnalyticsData } from "../../../domain/interface/event-analytics/EventAnalysisData";
import { EventAnalyticsFilter } from "../../../domain/interface/event-analytics/eventAnalyticsFilter";
import { IEventAnalyticsRepository } from "../../../domain/repositories/common/IEventAnalyticsRepository";
import { BookingModel } from "../../db/models/user/BookingModel";

export class EventAnalyticsRepository implements IEventAnalyticsRepository {

  async getEventAnalytics(organizerId: string, filter: EventAnalyticsFilter): Promise<EventAnalyticsData> {
      
     const match : Record<string, unknown> = {
        organizerId,
        eventId: filter.eventId
     };
     if(filter.from || filter.to){
      match.createdAt = {
        ...(filter.from && {$gte: new Date(filter.from)}),
        ...(filter.to && {$lte : new Date(filter.to)})
      }
     }

      if (filter.bookingStatus) match.status = filter.bookingStatus;
      if (filter.paymentMethod) match.paymentMethod = filter.paymentMethod;
      if (filter.refundStatus) match.refundStatus = filter.refundStatus;

       if (filter.search) {
      match.$or = [
        { userName: { $regex: filter.search, $options: "i" } },
        { userEmail: { $regex: filter.search, $options: "i" } },
      ];
    }

    
      /* ---------------- SUMMARY ---------------- */
    const [summary] = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          ticketsSold: {
            $sum: {
              $sum: {
                $map: {
                  input: "$tickets",
                  as: "t",
                  in: {
                    $cond: [
                      { $eq: ["$status", "confirmed"] },
                      "$$t.quantity",
                      0,
                    ],
                  },
                },
              },
            },
          },
          grossRevenue: { $sum: "$totalAmount" },
          refundedAmount: { $sum: "$refundedAmount" },
          organizerRevenue: { $sum: "$organizerAmount" },
          platformFee: { $sum: "$platformFee" },
          paidAmount: {
            $sum: {
              $cond: [{ $eq: ["$payoutStatus", "paid"] }, "$organizerAmount", 0],
            },
          },
          pendingAmount: {
            $sum: {
              $cond: [{ $eq: ["$payoutStatus", "pending"] }, "$organizerAmount", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          ticketsSold: 1,
          grossRevenue: 1,
          refundedAmount: 1,
          organizerRevenue: 1,
          platformFee: 1,
          netRevenue: { $subtract: ["$grossRevenue", "$refundedAmount"] },
          paidAmount: 1,
          pendingAmount: 1,
        },
      },
    ]);

    /* ---------------- TRENDS ---------------- */
    const ticketTrend = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          value: {
            $sum: {
              $sum: {
                $map: {
                  input: "$tickets",
                  as: "t",
                  in: {
                    $cond: [
                      { $eq: ["$status", "confirmed"] },
                      "$$t.quantity",
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", value: 1 } },
    ]);

    const revenueTrend = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          value: { $sum: "$organizerAmount" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", value: 1 } },
    ]);

    return {
      summary: summary ?? {
        ticketsSold: 0,
        grossRevenue: 0,
        refundedAmount: 0,
        netRevenue: 0,
        organizerRevenue: 0,
        platformFee: 0,
        paidAmount: 0,
        pendingAmount: 0,
      },
      ticketTrend,
      revenueTrend,
      paymentSplit: [],
      refundSplit: [],
    };

  }
}