
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouts from './interface/routes/user/userRouts';
import organizerRoutes from "./interface/routes/organizer/organizerRoutes"
import { DbConnection } from './config/mongoose/DbConnection';
import cookieParser from "cookie-parser";
import adminRoutes from "./interface/routes/admin/adminRoutes"
import { ErrorHandlingMiddleware } from './infrastructure/middleware/errorHandling';
import  http  from 'http';
import { AdminSocketService } from './infrastructure/websocket/adminSocketService';
import { fetchUserUseCase } from './di/admin/containersList';
import { UserSocketService } from './infrastructure/websocket/userSocketService';
import { Server } from 'socket.io';


dotenv.config();


const app = express();
  const server =http.createServer(app)
const  io= new Server(server,{
        cors:{
          origin:"http://localhost:3000",
          credentials:true
        }
      })
      const adminNamespace = io.of("/admin");
const userNamespace = io.of("/user");
 export const adminSocketService= new AdminSocketService(adminNamespace,io,userNamespace,fetchUserUseCase)
 export  const userSocketService= new UserSocketService(userNamespace)

// initializeWebSocket(server);
DbConnection.connect();
app.use(express.json());
app.use(cookieParser());
app.use(ErrorHandlingMiddleware.handleError)
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true, // Allow cookies if using HTTP-only cookies
 
}));
app.use('/api/user', userRouts);
app.use('/api/organizer',organizerRoutes)
app.use('/api/admin',adminRoutes)
// app.use(ErrorHandlingMiddleware.handleError);


server.listen(process.env.PORT, () => {
  console.log('server is running ');
});
