import { Types } from "mongoose";
import { IMessage } from "../../infrastructure/db/models/common/chat/MessageModel";
import { IConversation } from "../../infrastructure/db/models/common/chat/ConversationModel";

export type MessageDbModel = IMessage & {_id: Types.ObjectId};
export type ConversationDbModel = IConversation& {_id: Types.ObjectId};