import mongoose from 'mongoose';

export class DbConnection {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/event-app');
      console.log('Mongodb connected');
    } catch (err) {
      console.error('Mongodb connection  Failed');
    }
  }
}
