import mongoose, { Types } from 'mongoose';
import { IOrganizerDashboardRepository } from '../../../domain/repositories/organizer/IOrganizerDashboardRepository';
import { BookingModel } from '../../db/models/user/BookingModel';
import {
  IEarningsOverview,
  IOrganizerEventPerformance,
  IOrganizerKycStatus,
  IOrganizerPayoutSummary,
  IOrganizerSubscriptionSummary,
  ITicketsOverview,
  OrganizerDashboardFilter,
} from '../../../domain/interface/organizer-dashboard/dashboard';
import { OrganizerSubscriptionModel } from '../../db/models/organizer/subscription/OrganizerSubscriptionModel';
import UserModel from '../../db/models/user/UserModel';
import UploadDocumentModel from '../../db/models/organizer/profile/UploadDocument';

export class OrganizerDashboardRepository implements IOrganizerDashboardRepository {
  async getTicketsOverview(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<ITicketsOverview> {
    const oid = new mongoose.Types.ObjectId(organizerId);

    const from = filter?.from ? new Date(filter.from) : new Date(0);
    const to = filter?.to ? new Date(filter.to) : new Date();
    to.setHours(23, 59, 59, 999);

    const agg = await BookingModel.aggregate([
      {
        $match: {
          organizerId: oid,

          createdAt: { $gte: from, $lte: to },
        },
      },

      {
        $facet: {
          tickets: [
            {
              $group: {
                _id: null,
                totalTicketsSold: { $sum: { $sum: '$tickets.quantity' } },
                totalBookings: { $sum: 1 },
                cancelledTickets: {
                  $sum: {
                    $cond: [
                      { $eq: ['$status', 'cancelled'] },
                      { $sum: '$tickets.quantity' },
                      0,
                    ],
                  },
                },
                refundedTickets: {
                  $sum: {
                    $cond: [
                      { $eq: ['$status', 'refunded'] },
                      { $sum: '$tickets.quantity' },
                      0,
                    ],
                  },
                },
              },
            },
          ],

          dailyTrend: [
            {
              $group: {
                _id: {
                  date: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                  },
                },
                tickets: { $sum: { $sum: '$tickets.quantity' } },
              },
            },
            { $sort: { '_id.date': 1 } },
            { $project: { _id: 0, date: '$_id.date', tickets: 1 } },
          ],
        },
      },
    ]);

    const result = agg[0];
    const t = result.tickets[0] || {};

    return {
      totalTicketsSold: t.totalTicketsSold || 0,
      totalBookings: t.totalBookings || 0,
      cancelledTickets: t.cancelledTickets || 0,
      refundedTickets: t.refundedTickets || 0,
      dailyTrend: result.dailyTrend,
    };
  }

  async getEarningsOverview(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IEarningsOverview> {
    const oid = new mongoose.Types.ObjectId(organizerId);

    const from = filter?.from ? new Date(filter.from) : new Date(0);
    const to = filter?.to ? new Date(filter.to) : new Date();
    to.setHours(23, 59, 59, 999);

    const agg = await BookingModel.aggregate([
      {
        $match: {
          organizerId: oid,
          status: { $in: ['confirmed', 'refunded'] },

          createdAt: { $gte: from, $lte: to },
        },
      },

      {
        $group: {
          _id: null,
          grossRevenue: { $sum: '$totalAmount' },
          refundedAmount: { $sum: '$refundedAmount' },
          platformFee: { $sum: '$platformFee' },
          organizerEarnings: { $sum: '$organizerAmount' },
        },
      },
    ]);

    const row = agg[0] || {};

    // Trend
    const trend = await BookingModel.aggregate([
      {
        $match: {
          organizerId: oid,
          payoutStatus: 'paid',
          createdAt: { $gte: from, $lte: to },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: '%Y-%m-%d', date: '$payoutDate' },
            },
          },
          amount: { $sum: '$organizerAmount' },
        },
      },
      { $sort: { '_id.date': 1 } },
      { $project: { _id: 0, date: '$_id.date', amount: 1 } },
    ]);

    return {
      grossRevenue: row.grossRevenue || 0,
      refundedAmount: row.refundedAmount || 0,
      netRevenue: (row.grossRevenue || 0) - (row.refundedAmount || 0),
      platformFee: row.platformFee || 0,
      organizerEarnings: row.organizerEarnings || 0,
      dailyRevenueTrend: trend,
    };
  }

  async getEventPerformance(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerEventPerformance> {
    const oid = new mongoose.Types.ObjectId(organizerId);
    const from = filter?.from ? new Date(filter.from) : new Date(0);
    const to = filter?.to ? new Date(filter.to) : new Date();
    to.setHours(23, 59, 59, 999);

    const events = await BookingModel.aggregate([
      { $match: { organizerId: oid, createdAt: { $gte: from, $lte: to } } },

      {
        $group: {
          _id: '$eventId',
          eventTitle: { $first: '$eventTitle' },
          ticketsSold: {
            $sum: {
              $sum: {
                $map: {
                  input: '$tickets',
                  as: 't',
                  in: {
                    $cond: [
                      { $eq: ['$status', 'confirmed'] }, // Only count successful
                      '$$t.quantity',
                      0,
                    ],
                  },
                },
              },
            },
          },

          grossRevenue: { $sum: '$totalAmount' },
          refundedAmount: { $sum: '$refundedAmount' },
          netRevenue: {
            $sum: {
              $subtract: ['$totalAmount', '$refundedAmount'],
            },
          },
          organizerRevenue: { $sum: '$organizerAmount' },
          platformFee: { $sum: '$platformFee' },

          payoutPending: {
            $sum: {
              $cond: [
                { $eq: ['$payoutStatus', 'pending'] },
                '$organizerAmount',
                0,
              ],
            },
          },

          payoutReceived: {
            $sum: {
              $cond: [
                { $eq: ['$payoutStatus', 'paid'] },
                '$organizerAmount',
                0,
              ],
            },
          },
        },
      },

      { $sort: { ticketsSold: -1 } },

      {
        $project: {
          eventId: { $toString: '$_id' },
          eventTitle: 1,
          ticketsSold: 1,
          grossRevenue: 1,
          refundedAmount: 1,
          netRevenue: 1,
          organizerRevenue: 1,
          platformFee: 1,
          payoutPending: 1,
          payoutReceived: 1,
        },
      },
    ]);

    return {
      totalEvents: events.length,
      data: events,
    };
  }

  async getPayoutSummary(
    organizerId: string,
    filter?: OrganizerDashboardFilter
  ): Promise<IOrganizerPayoutSummary> {
    const oid = new mongoose.Types.ObjectId(organizerId);
    const from = filter?.from ? new Date(filter.from) : new Date(0);
    const to = filter?.to ? new Date(filter.to) : new Date();
    to.setHours(23, 59, 59, 999);

    const rows = await BookingModel.aggregate([
      {
        $match: {
          organizerId: oid,
          organizerAmount: { $gt: 0 },

          createdAt: { $gte: from, $lte: to },
        },
      },
      {
        $project: {
          bookingId: { $toString: '$_id' },
          payoutAmount: '$organizerAmount',
          payoutStatus: 1,
          payoutDueDate: 1,
          payoutDate: 1,
        },
      },
      { $sort: { payoutDueDate: -1 } },
    ]);

    return {
      totalPendingAmount: rows
        .filter(r => r.payoutStatus === 'pending')
        .reduce((s, r) => s + r.payoutAmount, 0),

      totalPaidAmount: rows
        .filter(r => r.payoutStatus === 'paid')
        .reduce((s, r) => s + r.payoutAmount, 0),

      data: rows,
    };
  }
  async getSubscriptionSummary(
    organizerId: string,
   
  ): Promise<IOrganizerSubscriptionSummary | null> {
   
    const sub = await OrganizerSubscriptionModel.findOne({
      organizerId: new Types.ObjectId(organizerId),
      status: 'active',
      
    }).sort({ createdAt: -1 });

    if (!sub) return null;
     console.log("subjext", sub)
    return {
      planName: sub.planName,
      price: sub.price || 0,
      startDate: sub.startDate.toISOString(),
      endDate: sub.endDate.toISOString(),
      isActive: true,
    };
  }

  async getKycStatus(organizerId: string): Promise<IOrganizerKycStatus> {
    // -----------------------------
    // 1️⃣ Fetch KYC status from User
    // -----------------------------
    const user = await UserModel.findById(organizerId)
      .select('kycStatus isKycResubmitted')
      .lean();

    if (!user) {
      return {
        kycStatus: 'N/A',
        isKycResubmitted: false,
        documents: [],
      };
    }

    // -----------------------------
    // 2️⃣ Fetch all uploaded documents
    // -----------------------------
    const docs = await UploadDocumentModel.find({
      organizerId,
      current: true, // Only show latest active version
    })
      .select('type url status reason uploadedAt')
      .lean();

    return {
      kycStatus: user.kycStatus,
      isKycResubmitted: user.isKycResubmitted,
      documents: docs.map(d => ({
        type: d.type,
        url: d.cloudinaryPublicId,
        status: d.status, // Pending / Approved / Rejected
        reason: d.reason || '',
        uploadedAt: d.uploadedAt,
      })),
    };
  }
}
