
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {Server}from "socket.io"
import userRouts from './interface/routes/user/userRouts';
import organizerRoutes from "./interface/routes/organizer/organizerRoutes"
import { DbConnection } from './config/mongoose/DbConnection';
import cookieParser from "cookie-parser";
import adminRoutes from "./interface/routes/admin/adminRoutes"
import { ErrorHandlingMiddleware } from './infrastructure/middleware/errorHandling';
import  http  from 'http';
import { initializeWebSocket } from './infrastructure/websocket/socketServer';

dotenv.config();


const app = express();
const server =http.createServer(app)

initializeWebSocket(server);
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


server.listen(process.env.PORT, () => {
  console.log('server is running ');
});
