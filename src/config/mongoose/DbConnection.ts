import mongoose from 'mongoose';
import { ENV } from '../../infrastructure/config/common/env';

export class DbConnection {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(
        ENV.MONGO_URI || 'mongodb://localhost:27017/event-app'
      );
      console.log('Mongodb connected');
    } catch (err) {
      console.error('Mongodb connection  Failed');
    }
  }
}
