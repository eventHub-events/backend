import mongoose, { Document, Schema, Types } from 'mongoose';

import { ILocation } from '../../../../../domain/valueObject/organizer/location';
import { locationSchema } from './LocationModel';

import {
  EventApprovalStatus,
  EventStatus,
  EventType,
  EventVisibility,
} from '../../../../../domain/enums/organizer/events';

export interface IEvent extends Document {
  organizerId: Types.ObjectId;
  type: EventType;
  categoryId: Types.ObjectId;
  location: ILocation;
  totalCapacity: number;
  description: string;
  title: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  approvedStatus?: EventApprovalStatus;
  category?: string;

  status: EventStatus;
  ticketsSold: number;
  isDeleted: boolean;

  featured?: boolean;
  startTime?: string;
  endTime?: string;

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  organizerEmail?: string;
  videos?: string[];
  visibility?: EventVisibility;

  tags?: string[];
  payoutStripeAccountId :  string;

  reviews?: Types.ObjectId;
}

const EventSchema = new Schema<IEvent>(
  {
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    payoutStripeAccountId : {
        type : String
    },
    category: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: locationSchema,
    },
    approvedStatus: {
      type: String,
      enum: Object.values(EventApprovalStatus),
      default: EventApprovalStatus.Pending,
    },

    totalCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    videos: [{ type: String }],

    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    images: [{ type: String, required: true }],

    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.Draft,
    },

    featured: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    ticketsSold: {
      type: Number,
      default: 0,
    },

    tags: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    organizerEmail: {
      type: String,
    },

    visibility: {
      type: String,
      enum: Object.values(EventVisibility),
      default: EventVisibility.Public,
    },

    reviews: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  },
  { timestamps: true }
);

//  Indexing For Performance //

EventSchema.index({ title: 1, organizerId: 1 });
EventSchema.index({ categoryId: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ featured: 1 });
EventSchema.index({ 'location.city': 1, startDate: -1 });
EventSchema.index({ startDate: 1, endDate: 1 });
EventSchema.index({ tags: 1 });

// model Export //

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);
