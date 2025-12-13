export interface CommunityMessagePayload {
  eventId: string;
  senderId: string;
  senderType: string;
  senderName?: string;
  message: string;
  conversationId?: string;
  createdAt: string;
}
export interface JoinEventRoomPayload {
  eventId: string;
}
export interface JoinPrivateRoomPayload {
  conversationId: string;
  peerId: string;
  userId: string;
}

export interface PrivateMessagePayload {
  conversationId: string;
  senderId: string;
  senderType: string;
  receiverId: string;
  eventId: string;
  message: string;
  createdAt: string;
  senderName: string;
}

export interface OnlineStatusPayload {
  userId: string;
  isOnline: boolean;
}
export interface ChatOpenState {
  userId: string;
  conversationId: string;
}
