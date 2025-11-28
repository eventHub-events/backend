import { MessageTypes, SenderTypes } from "../../../../infrastructure/db/models/common/chat/MessageModel";

export interface SendMessageRequestDTO {
   conversationId: string;
   senderId: string;
   senderType: SenderTypes|string;
   message :string;
   senderName:string
   messageType?: MessageTypes;
   receiverId?:string
   createdAt?: string;
   eventId?:string;
   isRead?:boolean
}