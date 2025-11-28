import { Namespace, Socket } from "socket.io";
import { CommunityMessagePayload } from "../../types/chat/chat";



export class CommunityChatSocketService {
  constructor(private namespace: Namespace) {
     this.namespace.on("connection", this.onConnection.bind(this));
  }

 private onConnection(socket: Socket) {
   console.log("community chat connected",socket.id);

   socket.on("join_event_room", (eventId: string) => {
      socket.join(eventId);

      console.log(`Socket joined event Room ${eventId}`);

   });
  
   socket.on("send_community_message", (data:CommunityMessagePayload) => {
       const { eventId, senderId } = data;

  this.namespace.to(eventId).emit("community_message_received", data);



      socket.to(eventId).emit("new_message_alert", {
    from: senderId,
    eventId,
    isCommunity: true
  });
    });

    socket.on("disconnect", () => {
       console.log('Community chat socket disconnected:', socket.id);
    });
 }
}