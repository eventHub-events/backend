
import { BaseSocketService } from "./baseSocketService";
import { Socket,Server, Namespace } from "socket.io";



export class UserSocketService extends BaseSocketService{
  constructor(io:Namespace){
    super(io)
  }
  protected override onConnection(socket: Socket): void {
         super.onConnection(socket)
         const role=socket.handshake.auth?.role
         const userId= socket.handshake.auth?.userId
        
          if(role !=="user"&&role !=="organizer"){
              socket.disconnect()
              return
          }
         console.log(`${role} connected with id ${userId}`);
      
         socket.on("disconnect",()=>{
          console.log(`${role} disconnected with id ${userId}`)
         })
  }
}