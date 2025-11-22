import { Namespace, Socket } from "socket.io";
import { ChatOpenState, JoinPrivateRoomPayload, PrivateMessagePayload } from "../../types/chat/chat";
import { ISendMessageUseCase } from "../../../application/interface/useCases/common/chat/ISendMessageUseCase";
import { IMarkMessageAsReadUseCase } from "../../../application/interface/useCases/common/chat/IMarkMessageAsReadUseCase";

export class PrivateChatSocketService {
   private onlineUsers: Map<string, string> = new Map();
   private openChats : Map<string,string> = new Map();
  constructor(
     private nameSpace: Namespace,
     private _sendMessageUseCase : ISendMessageUseCase,
     private _markMessageAsReadUseCase : IMarkMessageAsReadUseCase

  ) {
     this.nameSpace.on("connection", this.onConnection.bind(this))
  }
   private   onConnection(socket: Socket) {
    console.log("private chat connected", socket.id);
     
     // USER JOINS WITH THEIR USER ID
    socket.on("user_online", (userId: string) => {
      this.onlineUsers.set(userId, socket.id);

      console.log("User online:", userId);
     
      
    });
 // USER OPEN A CHAT DRAWER //
    socket .on("chat_open", async ({userId,conversationId}: ChatOpenState) => {
         console.log("chat_open:", { userId, conversationId });
         await this._markMessageAsReadUseCase.execute(conversationId, userId);
         this.openChats.set(userId, conversationId);
    });

      // USER CLOSES CHAT DRAWER
    socket.on("chat_close", ({ userId }: { userId: string }) => {
      console.log("chat_close:", userId);
      this.openChats.delete(userId);
    });

    socket.on("join_private_room", ({ conversationId, peerId, userId }:JoinPrivateRoomPayload) => {
    socket.join(conversationId);
    socket.data.peerId = peerId as string;

    console.log("Joined:", { conversationId, userId, peerId });
     const peerSocketId = this.onlineUsers.get(peerId);
      if (peerSocketId) {
        socket.emit("online_status_change", {
            userId: peerId,
            isOnline: true
        });
    }

    // 🚀 Notify the peer that THIS user is online
     const myId = socket.handshake.auth.userId;
    const mySocketId = this.onlineUsers.get(myId);

    if (peerSocketId) {
        this.nameSpace.to(peerSocketId).emit("online_status_change", {
            userId: myId,
            isOnline: true
        });
    }
       
    });

    socket.on("send_private_message", async (data:PrivateMessagePayload) => {
      const { conversationId, senderId,eventId,receiverId,createdAt, message,senderType,senderName } = data;
      console.log("data in private message ", data)
      const receiverOpenChat = this.openChats.get(receiverId);
      const isRead = receiverOpenChat === conversationId;
      console.log("data", data)
      await this._sendMessageUseCase.execute({
         conversationId,
        senderId,
        receiverId,
        senderType ,
        eventId,
        message,
        createdAt,
        isRead,
        senderName
      })

  // Send the message normally
  this.nameSpace.to(conversationId).emit("private_message_received",{...data, isRead});
        
   const receiverSocketId = this.onlineUsers.get(receiverId);
   
  
   if (receiverSocketId) {
    console.log("🔔 Sending direct alert to:", receiverId, receiverSocketId);

    this.nameSpace.to(receiverSocketId).emit("new_message_alert", {
      from: senderId,
      conversationId,
      eventId
    });
  } else {
    console.log("⚠ receiver offline, no socket available");
  }
        

    });
    
    socket.on("disconnect", () => {
    const userId = [...this.onlineUsers.entries()]
      .find(([_, sId]) => sId === socket.id)?.[0];

    if (!userId) return;
    this.onlineUsers.delete(userId);
     this.openChats.delete(userId);

    const peerId = socket.data.peerId as string;
    const peerSocketId = this.onlineUsers.get(peerId);

    if (peerSocketId) {
        this.nameSpace.to(peerSocketId).emit("online_status_change", {
            userId,
            isOnline: false
        });
    }
});
  }
}
