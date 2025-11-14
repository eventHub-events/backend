import { Socket ,Server, Namespace} from "socket.io";
import { BaseSocketService } from "./baseSocketService";
import http from "http";
import { IFetchUserUseCase } from "../../application/interface/useCases/admin/IFetchUsersUseCase";

export class AdminSocketService extends BaseSocketService  {
  private _ioServer:Server;
  private _userNamespace:Namespace;
  constructor(adminNamespace: Namespace, ioServer: Server, userNamespace: Namespace, private _userManagementUseCase:IFetchUserUseCase) {
    super(adminNamespace);
    this._ioServer=ioServer;
    this._userNamespace=userNamespace
  }
  protected override onConnection(socket: Socket): void {
    super.onConnection(socket);
    const role = socket.handshake.auth?.role;
    const adminId= socket.handshake.auth?.userId
     if (role!=="admin") {
      socket.disconnect();
       return;
     }
    console.log("admin connected:", adminId); 
    socket.on("disconnect", () => {
      console.log("admin disconnected:", adminId);
    });
    this.registerBlockUserHandler(socket)
    
  }

  private registerBlockUserHandler(socket:Socket){
  socket.on("block-user",(data)=>this.handleBlockUser(socket,data))
  }
  private async handleBlockUser(socket:Socket,{targetUserId,isBlocked}:{targetUserId:string,isBlocked:boolean}){
    try{
       const  result= await this._userManagementUseCase.updateUser(targetUserId,{isBlocked})
       
       console.log("sockets",[...this._userNamespace.sockets.values()])
       const targetSocket=[...this._userNamespace.sockets.values()].find((s)=>s.handshake.auth?.userId === targetUserId)
      
       if(targetSocket&&isBlocked){
        targetSocket.emit("blocked","you are blocked by  admin")
        setTimeout(() => {
    targetSocket.disconnect();
  }, 100);

       }
       socket.emit("block-user-success", {
        message: `User ${targetUserId} was blocked.`,
        result,
      });
    } catch (err) {
      socket.emit("block-user-error", {
        message: "Error blocking user.",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }

  }

  

}
  