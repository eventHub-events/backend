import mongoose, { Schema, Types } from 'mongoose';

export interface IEventAnalytics extends Document {
  eventId: Types.ObjectId;
  viewsCount: number;
  bookMarkCount: number;
  sharesCount: number;
  averageRating: number;
  reviewCount: number;
}

const EventAnalyticsSchema = new Schema<IEventAnalytics>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    bookMarkCount: {
      type: Number,
      default: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

EventAnalyticsSchema.index({ eventId: 1 });

export const EventAnalyticsModel = mongoose.model<IEventAnalytics>(
  'EventAnalytics',
  EventAnalyticsSchema
);
