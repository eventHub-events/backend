import { MessageTypes, SenderTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";

export interface SendMessageRequestDTO {
   conversationId: string;
   senderId: string;
   senderType: SenderTypes;
   message :string;
   senderName:string
   messageType?: MessageTypes;
   createdAt?: string
}