import { Namespace, Socket } from "socket.io";



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
  
   socket.on("send_community_message", (data) => {
       const { eventId } = data;
       this.namespace.to(eventId).emit("community_message_received", data);
    });

    socket.on("disconnect", () => {
       console.log('Community chat socket disconnected:', socket.id);
    });
 }
}