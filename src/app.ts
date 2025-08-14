
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouts from './interface/routes/user/userRouts';
import { DbConnection } from './config/mongoose/DbConnection';
import cookieParser from "cookie-parser";
import adminRoutes from "./interface/routes/admin/adminRoutes"
import { ErrorHandlingMiddleware } from './infrastructure/middleware/errorHandling';

dotenv.config();


const app = express();
DbConnection.connect();
app.use(express.json());
app.use(cookieParser());
app.use(ErrorHandlingMiddleware.handleError)
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true, // Allow cookies if using HTTP-only cookies
 
}));
app.use('/api/user', userRouts);
app.use('/api/admin',adminRoutes)


app.listen(process.env.PORT, () => {
  console.log('server is running ');
});
