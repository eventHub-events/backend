import { Namespace, Socket } from 'socket.io';

export class BaseSocketService {
  protected io: Namespace;
  constructor(io: Namespace) {
    this.io = io;
    this.io.on('connection', this.onConnection.bind(this));
  }
  protected onConnection(socket: Socket) {
    console.log('websocket connected', socket.id);
  }
}
