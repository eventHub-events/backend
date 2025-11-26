
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouts from './interfaceAdapter/routes/user/userRouts';
import organizerRoutes from "./interfaceAdapter/routes/organizer/organizerRoutes"
import { DbConnection } from './config/mongoose/DbConnection';
import cookieParser from "cookie-parser";
import adminRoutes from "./interfaceAdapter/routes/admin/adminRoutes"
import { ErrorHandlingMiddleware } from './infrastructure/middleware/errorHandling';
import  http  from 'http';
import { AdminSocketService } from './infrastructure/websocket/adminSocketService';
import { fetchUserUseCase } from './di/admin/containersList';
import { UserSocketService } from './infrastructure/websocket/userSocketService';
import { Server } from 'socket.io';
import stripeWebhookRoute from "../src/interfaceAdapter/routes/webhooks/stripeWebhookRoute"
import { subscriptionExpiryMonitor } from './di/organizer/subscription/container';
import { payoutSchedulerJob } from './di/organizer/payout/container';
import chatRoutes  from "./interfaceAdapter/routes/chat/chatRoutes";
import { PrivateChatSocketService } from './infrastructure/websocket/chat/privateChatSocketService';
import { CommunityChatSocketService } from './infrastructure/websocket/chat/communityChatSocketService';
import { markMessagesAsReadUseCase, sendMessagesUseCase } from './di/common/chat/container';
import reviewRoutes from "./interfaceAdapter/routes/review/reviewRoutes";



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
const privateChatNamespace = io.of("/chat/private");
const communityChatNamespace = io.of("/chat/community");

export const privateChatSocketService = new PrivateChatSocketService(privateChatNamespace,sendMessagesUseCase,markMessagesAsReadUseCase);
export const communityChatSocketService = new CommunityChatSocketService(communityChatNamespace);
 export const adminSocketService= new AdminSocketService(adminNamespace,io,userNamespace,fetchUserUseCase)
 export  const userSocketService= new UserSocketService(userNamespace)

// initializeWebSocket(server);
DbConnection.connect();
app.use("/api/webhooks",stripeWebhookRoute)
app.use(express.json());
app.use(cookieParser());
subscriptionExpiryMonitor.startJob();
payoutSchedulerJob.start();
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true, // Allow cookies if using HTTP-only cookies
 
}));
app.use('/api/user', userRouts);
app.use('/api/organizer',organizerRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reviews', reviewRoutes);
//  app.use(ErrorHandlingMiddleware.handleError);


server.listen(process.env.PORT, () => {
  console.log('server is running ');
});
