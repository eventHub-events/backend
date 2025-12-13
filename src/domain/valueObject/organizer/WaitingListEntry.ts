import { ObjectId } from 'mongoose';

export interface IWaitingListEntry {
  userId: string | ObjectId;
  email: string;
  addedAt: Date;
  phone?: string;
}
