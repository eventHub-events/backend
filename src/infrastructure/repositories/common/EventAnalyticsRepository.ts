import { Types } from 'mongoose';
import {
  EventAnalyticsData,
  SALE_STATUSES,
} from '../../../domain/interface/event-analytics/EventAnalysisData';
import { EventAnalyticsFilter } from '../../../domain/interface/event-analytics/eventAnalyticsFilter';
import { IEventAnalyticsRepository } from '../../../domain/repositories/common/IEventAnalyticsRepository';
import { BookingModel, IBooking } from '../../db/models/user/BookingModel';
import { RefundStatus } from '../../../domain/enums/user/Booking';

export class EventAnalyticsRepository implements IEventAnalyticsRepository {
  async getEventAnalytics(
    organizerId: string,
    filter: EventAnalyticsFilter
  ): Promise<EventAnalyticsData> {
    console.log('filter is', filter);
    const match: Record<string, unknown> = {
      organizerId: new Types.ObjectId(organizerId),
      eventId: new Types.ObjectId(filter.eventId),
    };
    if (filter.from || filter.to) {
      match.createdAt = {
        ...(filter.from && { $gte: new Date(filter.from) }),
        ...(filter.to && { $lte: new Date(filter.to) }),
      };
    }

    if (filter.bookingStatus) match.status = filter.bookingStatus;
    if (filter.paymentMethod) match.paymentMethod = filter.paymentMethod;
    if (filter.refundStatus) match.refundStatus = filter.refundStatus;

    if (filter.search) {
      match.$or = [
        { userName: { $regex: filter.search, $options: 'i' } },
        { userEmail: { $regex: filter.search, $options: 'i' } },
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
                  input: '$tickets',
                  as: 't',
                  in: {
                    $cond: [
                      { $in: ['$status', SALE_STATUSES] },
                      '$$t.quantity',
                      0,
                    ],
                  },
                },
              },
            },
          },
          grossRevenue: {
            $sum: {
              $cond: [{ $in: ['$status', SALE_STATUSES] }, '$totalAmount', 0],
            },
          },
          refundedAmount: { $sum: '$refundedAmount' },
          organizerRevenue: { $sum: '$organizerAmount' },
          platformFee: { $sum: '$platformFee' },
          paidAmount: {
            $sum: {
              $cond: [
                { $eq: ['$payoutStatus', 'paid'] },
                '$organizerAmount',
                0,
              ],
            },
          },
          pendingAmount: {
            $sum: {
              $cond: [
                { $eq: ['$payoutStatus', 'pending'] },
                '$organizerAmount',
                0,
              ],
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
          netRevenue: { $subtract: ['$grossRevenue', '$refundedAmount'] },
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
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          value: {
            $sum: {
              $sum: {
                $map: {
                  input: '$tickets',
                  as: 't',
                  in: {
                    $cond: [
                      { $in: ['$status', SALE_STATUSES] },
                      '$$t.quantity',
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
      { $project: { _id: 0, date: '$_id', value: 1 } },
    ]);

    const revenueTrend = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          value: { $sum: '$organizerAmount' },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: '$_id', value: 1 } },
    ]);

    const paymentMethodSplitData = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$paymentMethod',
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: 1,
        },
      },
    ]);

    const refundSplit = await BookingModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$refundStatus',
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: 1,
        },
      },
    ]);

    const totalBookings = await BookingModel.countDocuments(match);
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const totalPages = Math.ceil(totalBookings / limit);

    const bookings = await BookingModel.find(match)
      .sort({ createdAt: -1 })
      .limit(filter.limit ?? 10)
      .skip(((filter.page ?? 1) - 1) * (filter.limit ?? 10))
      .select({
        userName: 1,
        userEmail: 1,
        tickets: 1,
        totalAmount: 1,
        paymentMethod: 1,
        refundStatus: 1,
        status: 1,
        createdAt: 1,
      })
      .lean<IBooking[]>();

    const bookingRows = bookings.map(b => ({
      id: b._id.toString(),
      userName: b.userName,
      userEmail: b.userEmail,
      tickets: b.tickets.reduce((s, t) => s + t.quantity, 0),
      amount: b.totalAmount,
      paymentMethod: b.paymentMethod,
      refundStatus: b.refundStatus ?? RefundStatus.NONE,
      status: b.status,
      createdAt: b.createdAt,
    }));

    /* ---------------- TICKET TYPE PERFORMANCE ---------------- */
    const ticketTypePerformance = await BookingModel.aggregate([
      { $match: match },

      { $unwind: '$tickets' },

      {
        $match: {
          status: { $in: SALE_STATUSES },
        },
      },

      {
        $group: {
          _id: '$tickets.name',
          ticketsSold: { $sum: '$tickets.quantity' },
          revenue: {
            $sum: {
              $multiply: ['$tickets.quantity', '$tickets.price'],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          ticketType: '$_id',
          ticketsSold: 1,
          revenue: 1,
        },
      },

      { $sort: { revenue: -1 } },
    ]);

    const topTicketType = ticketTypePerformance[0] ?? null;
    const ticketRevenueSplit = ticketTypePerformance.map(t => ({
      name: t.ticketType,
      value: t.revenue,
    }));

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
      paymentSplit: paymentMethodSplitData,
      refundSplit,
      ticketRevenueSplit,
      topTicketType,
      ticketTypePerformance,
      bookings: bookingRows,
      pagination: {
        total: totalBookings,
        page,
        limit,
        totalPages,
      },
    };
  }
}
