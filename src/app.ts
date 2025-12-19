import { DbConnection } from './config/mongoose/DbConnection';
import http from 'http';
import { subscriptionExpiryMonitor } from './di/organizer/subscription/container';
import { payoutSchedulerJob } from './di/organizer/payout/container';
import { bookingsExpirationScheduler } from './di/user/booking/container';
import { ENV } from './infrastructure/config/common/env';
import { createSocketServer } from './infrastructure/websocket/socket-connection/createSocketServer';
import { createApp } from './infrastructure/http/createApp';

const app = createApp();
const server = http.createServer(app);
createSocketServer(server);

// initializeWebSocket(server);
DbConnection.connect();

subscriptionExpiryMonitor.startJob();
bookingsExpirationScheduler.start();
payoutSchedulerJob.start();

server.listen(ENV.PORT, () => {
  console.log('server is running ');
});
