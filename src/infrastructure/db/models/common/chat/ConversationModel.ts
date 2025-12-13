import mongoose, { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
  type: ConversationType;
  eventId: string;
  participants: string[];
  userId: string;
  userName?: string;
  lastMessage?: string;
  lastSenderId?: string;
}
export enum ConversationType {
  PRIVATE = 'private',
  COMMUNITY = 'community',
}
const ConversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: Object.values(ConversationType),
    },
    eventId: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    lastMessage: {
      type: String,
    },
    lastSenderId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ConversationModel = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema
);
