import http from 'http';
import { Server } from 'socket.io';
import { ENV } from '../../config/common/env';
import { PrivateChatSocketService } from '../chat/privateChatSocketService';
import { CommunityChatSocketService } from '../chat/communityChatSocketService';
import { AdminSocketService } from '../adminSocketService';
import { UserSocketService } from '../userSocketService';
import { fetchUserUseCase } from '../../../di/admin/containersList';
import {
  sendMessagesUseCase,
  markMessagesAsReadUseCase,
} from '../../../di/common/chat/container';

export function createSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: ENV.FRONTEND_URL,
      credentials: true,
    },
  });

  const adminNamespace = io.of('/admin');
  const userNamespace = io.of('/user');
  const privateChatNamespace = io.of('/chat/private');
  const communityChatNamespace = io.of('/chat/community');

  new PrivateChatSocketService(
    privateChatNamespace,
    sendMessagesUseCase,
    markMessagesAsReadUseCase
  );

  new CommunityChatSocketService(communityChatNamespace);

  new AdminSocketService(adminNamespace, io, userNamespace, fetchUserUseCase);

  new UserSocketService(userNamespace);

  return io;
}
