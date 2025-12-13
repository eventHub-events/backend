import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  BookingStatus,
  PaymentMethod,
  PayoutStatus,
  RefundStatus,
} from '../../../../domain/enums/user/Booking';

export interface IBooking extends Document {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  tickets: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: BookingStatus;
  eventTitle: string;
  eventDate: string;
  userName: string;
  organizerName: string;
  eventVenue: string;
  expiresAt: Date;
  eventImages?: string[];
  organizerId: Types.ObjectId;
  payoutStatus: PayoutStatus;
  payoutDueDate: Date;
  payoutDate: Date;
  organizerStripeId: string;
  paymentId: string;
  ticketUrls?: string[];
  sessionId?: string;
  commissionRate?: number;
  platformFee?: number;
  organizerAmount?: number;
  subScriptionPlanId?: string;
  paymentIntentId?: string;
  refundIds?: string[];
  refundedAmount?: number;
  userEmail?: string;
  refundStatus?: RefundStatus;
  paymentMethod?: PaymentMethod;
  refundDate?: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
    },
    refundStatus: {
      type: String,
      enum: Object.values(RefundStatus),
      default: RefundStatus.NONE,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CARD,
    },
    refundDate: {
      type: Date,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    sessionId: {
      type: String,
    },
    refundedAmount: {
      type: Number,
      default: 0,
    },
    paymentIntentId: {
      type: String,
    },
    refundIds: {
      type: [String],
    },
    commissionRate: {
      type: Number,
      default: 0,
    },
    platformFee: {
      type: Number,
      default: 0,
    },
    organizerAmount: {
      type: Number,
      default: 0,
    },
    subScriptionPlanId: {
      type: String,
    },
    eventTitle: {
      type: String,
    },
    userName: {
      type: String,
    },
    ticketUrls: {
      type: [String],
    },
    organizerName: {
      type: String,
    },
    payoutStatus: {
      type: String,
      enum: Object.values(PayoutStatus),
      default: PayoutStatus.PENDING,
    },
    payoutDueDate: {
      type: Date,
    },
    payoutDate: {
      type: Date,
    },
    organizerStripeId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    totalAmount: {
      type: Number,
    },
    eventImages: [{ type: String, required: true }],
    eventDate: {
      type: String,
    },
    eventVenue: {
      type: String,
    },
    tickets: [
      {
        name: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING_PAYMENT,
    },
    expiresAt: {
      type: Date,
      default: new Date(Date.now() + 15 * 60 * 1000),
    },
  },
  { timestamps: true }
);

bookingSchema.index({ createdAt: 1 });
bookingSchema.index({ organizerId: 1 });
bookingSchema.index({ status: 1, expiresAt: 1 });

export const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);
