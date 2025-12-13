import { Types } from 'mongoose';
import { IMessage } from '../../infrastructure/db/models/common/chat/MessageModel';
import { IConversation } from '../../infrastructure/db/models/common/chat/ConversationModel';
import { IReport } from '../../infrastructure/db/models/common/Report/ReportModel';

export type MessageDbModel = IMessage & { _id: Types.ObjectId };
export type ConversationDbModel = IConversation & { _id: Types.ObjectId };
export type ReportDbModel = IReport & { _id: Types.ObjectId };
