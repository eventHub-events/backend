import { Server ,Socket} from "socket.io"
import http from"http"


const connectedClients= new Map<string,Socket>()
//---->this creates a  map  to  store currently  connected clients.key will be user id and the value the socket connection  object
export const initializeWebSocket=(server:http.Server)=>{
  const io= new Server(server,{
    cors:{
      origin:"X",
     credentials: true,
    },
  })
  io.on("connection",(socket:Socket)=>{
    const userId=socket.handshake.auth?.userId
    if(!userId){
      socket.disconnect();
      return
    }
    console.log(`User ${userId} connected`);
    connectedClients.set(userId,socket)
socket.on("disconnect",()=>{
  connectedClients.delete(userId)
})

  })
  return{io,connectedClients}
}
export const getConnectedClients=()=>connectedClients