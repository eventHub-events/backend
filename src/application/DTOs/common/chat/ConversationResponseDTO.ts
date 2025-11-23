import { ConversationType } from "../../../../infrastructure/db/models/common/chat/ConversationModel";

export interface ConversationResponseDTO {
  id?: string;
  eventId: string;
  participants: string[];
  lastMessage?: string;
  type: ConversationType;
  lastSenderId?:  string;
  userId?:string
  userName?:string;
  unreadCount?:number;
}