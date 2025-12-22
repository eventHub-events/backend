import express from 'express';
import cookieParser from 'cookie-parser';
import adminRoutes from '../../interfaceAdapter/routes/admin/adminRoutes';
import reviewRoutes from '../../interfaceAdapter/routes/review/reviewRoutes';
import chatRoutes from '../../interfaceAdapter/routes/chat/chatRoutes';
import userRouts from '../../interfaceAdapter/routes/user/userRouts';
import organizerRoutes from '../../interfaceAdapter/routes/organizer/organizerRoutes';
import { ENV } from '../config/common/env';
import stripeWebhookRoute from '../../interfaceAdapter/routes/webhooks/stripeWebhookRoute';
import cors from 'cors';
import { ErrorHandlingMiddleware } from '../middleware/errorHandling';
export function createApp() {
  const app = express();

  app.use('/api/webhooks', stripeWebhookRoute);
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ENV.FRONTEND_URL,
      credentials: true,
    })
  );

  app.use('/api/user', userRouts);
  app.use('/api/organizer', organizerRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/reviews', reviewRoutes);
  // app.use(ErrorHandlingMiddleware.handleError);

  return app;
}
