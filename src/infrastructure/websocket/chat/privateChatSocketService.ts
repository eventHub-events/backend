import { Namespace, Socket } from "socket.io";

export class PrivateChatSocketService {
  constructor(private nameSpace: Namespace) {
     this.nameSpace.on("connection", this.onConnection.bind(this))
  }
  private onConnection(socket: Socket) {
    console.log("private chat connected", socket.id);

    socket.on("join_private_room", (conversationId :string) => {
       socket.join(conversationId);

       console.log(`socket joined privateRoom ${conversationId}`);
    });

    socket.on("send_private_message", (data) => {
       const {conversationId} = data;
       this.nameSpace.to(conversationId).emit("private_message_received", data);

    });

    socket.on("disconnect", () => {
       console.log("Private chat socket disconnected", socket.id)
    })
  }
}
